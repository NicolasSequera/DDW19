/*
** Modelo de datos para cada uno de los usuarios
*/

var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); /* Sirve para encriptar los datos de usuario */

var UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    }
);
/*
** Metodos de extension para UserSchema
*/
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email}).exec(
        function(err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                var err = new Error("Usuario no encontrado...");
                err.status = 401;
                return callback(err);
            }

            // Si no tengo error y tengo un usuario entonces continuo con la validacion de clave.
            bcrypt.compare(password, user.password, function(err, result){
                if (result == true) {
                    return callback(null, user);
                } else {
                    var err = new Error('Clave ingresada inválida...');
                    err.status = 401;
                    return callback(err);
                }
            });
        }
    );
};

// Capturar el evento de guardado y encriptar la clave...
UserSchema.pre("save", function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User = mongoose.model("User", UserSchema);