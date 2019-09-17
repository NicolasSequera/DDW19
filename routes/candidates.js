var express = require('express');
var router = express.Router();
var Candidate = require('../models/candidate');

/* POST para nuevo candidato...*/
router.post('/', function(req, res, next){

    var candidate = new Candidate({
      name: req.body.nameCand,
      lastName: req.body.lastCand,
      sex: req.body.sexCand,
      team: req.body.teamCand,
      cantVotes: 0,
      candFile: req.body.candFile
    });

    candidate.save(function(err, response){
      if(err) return res.status(500).send
      (err);
      if(response){
        res.status(200).redirect("/candidates");
      }else{
        res.status(500).send(new Error("No se pudo dar de alta"));
      }
    });
});

module.exports = router;
