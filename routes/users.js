var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST para nuevo usuario o login...*/
router.post('/', function(req, res, next){

  //Login...
  User.authenticate(req.body.logdni, function(err, user){
    
    if (err || !user) {

      var userData = {
        name: req.body.logname,
        dni: req.body.logdni,
        sex: req.body.logsex,
        voted: false
      }

      User.create(userData, function(err, user){
        if (err) {
          return next(err);
        } else {
          req.session.userId = user._id;
          console.log('Usuario creado...');
          return res.redirect("/votacion");
        }
      }); 

    } else {

      req.session.userId = user._id;
      console.log('usuario registrado');
      if(user.voted){
        console.log('El usuario ya voto');
        return res.redirect("/");
      }else{
        return res.redirect("/votacion");
      }
    }
  });
});

module.exports = router;
