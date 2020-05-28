
require('./config/config');


const express = require('express');
const app = express();
const bodyParser = require('body-parser');



///////////////////////////MIDELWARE//////////////////////////////////////

 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))

 // parse application/json
 app.use(bodyParser.json())


///////////////////////////////////////////////////////////////////////////



app.get('/', function (req, res) {
    res.json('Hello World')
})

app.get('/usuario', function (req, res) {
    res.json('Usuario -get')
})
//////////////ACTUALIZAR///////////////
app.post('/usuario', function (req, res) {
    let body = req.body

    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje:'El nombre es necezario'
        })
    }else{
        res.json({
            persona: body
        })
    }

   
})

//////////////ACTUALIZAR///////////////
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    })
   })
app.delete('/usuario', function (req, res) {
    res.json('Usuario -delete')
})


const puerto = process.env.PORT;
app.listen(puerto, () => {
    console.log('escuchando puerto: ' + puerto);
})