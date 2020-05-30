const mongoose = require('mongoose');
// se usa para definir el campo unico que no se puede repetir 
const uniqueValidator = require('mongoose-unique-validator'); 

// uso de la clase schema de mongoose para crear un fformato de obj
let Schema = mongoose.Schema;

/*roles validos para el enum de la propiedad roles */
let rolesValido = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'

}

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        required: [true, 'El correo es necesario'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    img:{
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValido    
    },
    estado:{
        type: Boolean,
        default: true,
        required: [true, 'La contraseña es necesario']
    },
    google:{
        type: Boolean,
        default: false
    }
});

/* se modifica el objeto para borrar el campo password */
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}


/*Define que el eschema de mongo use el pluing, ademas mongo ya injecta la variable path sin 
necesidad de los backticks y se presonaliza el mensaje de error*/ 
usuarioSchema.plugin( uniqueValidator, {
    message: '{PATH} debe de ser único'
});


/*Exporta */

module.exports = mongoose.model('Usuario', usuarioSchema);