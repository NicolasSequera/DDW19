//Modelo de datos para cada uno de los usuarios
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        dni: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        sex: {
            type: String,
            required: true,
            trim: true
        },
        voted: {
            type: Boolean,
            required: true
        }
    }
);

UserSchema.statics.authenticate = function(dni, callback) {
    User.findOne({dni}).exec(
        function(err, user){
            if (err) {
                return callback(err);
            }else{
                return callback(null, user);
            }
        }
    );
};

UserSchema.statics.actualizaEstado = function(id, callback) {
    User.updateOne({ _id: id },{ voted: true },(err) => {
        if (err) {
            return callback(err);
        }
    });
};

var User = mongoose.model("User", UserSchema);
module.exports = User;