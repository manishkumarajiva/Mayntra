require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Create App
const app = express();
const routes = require('./routes/index.api.js');

//Handle JSON
app.use(express.json());
app.use(express.urlencoded({extended : true}));
 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json());

app.use(cookieParser(process.env.SECRET_KEY,{httpOnly : true}));

//Handle Logger and CORS
app.use(morgan('dev'));
app.use(cors('*'));

//Set Path
app.use("/uploads",express.static('uploads'));


//Testing Routes
app.get("/",function(req,res){
    res.send(`<h1> Welcome Express's Home Page </h1>`);
});

app.use('/',routes);


module.exports = app;
