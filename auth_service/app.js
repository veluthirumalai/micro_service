const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;

var userLogin = require("./routes/login.route"); 


// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/api', (req, res) => {
    res.json({
      message: 'Welcome to the API'
    });
});

app.post('/verifyToken/**', (req, res) => {
    const token_id = req.params[0]
    //console.log('req--------------auth::service', token_id)
    jwt.verify(token_id, 'secretkey', (err, authData) => {
        if(err) {
            res.status(403).send('Invalid token')
            // console.log('InValid Token')
        } else {
          // console.log('Valid Token')
          res.json({
            message: 'Valid Token',
          });
        }
      });
});





app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/login", userLogin);



const port =  5000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
