
require('./config/config');
///////////////////////////VARIABLES//////////////////////////////////////

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



///////////////////////////MIDELWARE//////////////////////////////////////

 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))

 // parse application/json
 app.use(bodyParser.json())

 //rutas

 app.use(require('./rutas/usuario'))



///////////////////////////////////////////////////////////////////////////



app.get('/', function (req, res) {
    res.json('Hello World')
})


//////////////CONEXION MONGO ///////////////
 
 const url= process.env.URLDB;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err, res) => {
 if (err) {

 throw err
 } else{
 console.log(`Base de datos Online`)
 }
});




//////////////PUERTO///////////////

const puerto = process.env.PORT;
app.listen(puerto, () => {
    console.log('escuchando puerto: ' + puerto);
})