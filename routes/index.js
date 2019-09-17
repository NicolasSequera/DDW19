var express = require('express');
var router = express.Router();
var request = require("request");
var createError = require("http-errors");
var Candidate = require("../models/candidate");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Elecciones 2019' });
});

/* GET login */
router.get('/login', function(req, res, next){
  res.render('login', {title: "Login"});
});

/* GET votacion */
router.get('/votacion', function(req, res, next){
  Candidate.find((err, candidates) => {
    if(err){
      return res.status(500).send(err);
    } else {
      res.status(200).render('votacion', {title: "Votacion", candidates: candidates });
    }
  });
});

/* GET candidatos */
router.get('/candidates', function(req, res, next){
  Candidate.find((err, candidates) => {
    if(err){
      return res.status(500).send(err);
    } else {
      res.status(200).render('candidates', {title: "Candidatos", candidates: candidates });
    }
  });
});

router.get('/statistics', function(req, res, next){
  res.status(200).render('statistics', {title: "Estadisticas"});
});

module.exports = router;