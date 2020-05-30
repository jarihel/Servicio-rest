///////////////////////////VARIABLES//////////////////////////////////////

const express = require('express');
const app = express();
const Usuario = require('../modelos/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

//////////////OBTENER usuarios///////////////
app.get('/usuario', function (req, res) {

    let desde = req.query.desde || 0; /*si manda un parametro "desde" lo pasa a numero */
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    let body = req.body;

    Usuario.find({estado: true}, "nombre email role google img estado")
        /*recibe una condicion de busqueda y como segundo parametro recibe un string con los nombres de los atributos que queramos mostrar*/
        .skip(desde)    //SALTA 5 RESULTADOS
        .limit(limite) //LIMITA LOS RESULTADOS
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            /*Tanto find como count reciben la misma condicion de busqueda ej:  google: true*/
            Usuario.countDocuments({estado: true}, (err, conteo) => {
                res.json({
                    ok: true,
                    cantidad: conteo,
                    usuarios
                })


            })

        })




})
//////////////CREAR usuarios///////////////
app.post('/usuario', function (req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), /* encrypta la contraseña*/
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})
//////////////ACTUALIZAR con id///////////////
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;

    /*se usa underscore para filtrar las propiedades de un objeto, recibe el obj y un arr de propiedades visibles */
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);



    /* runValidators es una opcion de finbyidandupdate */
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
})
//////////////BORRAR usuarios///////////////
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let estadoNuevo = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, estadoNuevo, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

    /*
        Usuario.findByIdAndRemove(id, (err,usuarioBorrado) =>{
    
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //devolver una respuesta para cuando se manden varior borrar
            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    err:{
                        mensaje:'Usuario no encontrado'
                    }
                });
            }
    
            res.json({
                ok: true,
                usuario: usuarioBorrado
            })
    
    
    
        })*/


})





module.exports = app;