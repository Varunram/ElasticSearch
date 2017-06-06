var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var searchModule = require('../models/search.js');

router.get('/', function(req,res){
  res.render('index', {title: 'Clearbit Data'});
});

router.post('/get-clearbit', function(req, res) {
  searchModule.search(req.body);
  res.render('index', {title: 'Clearbit SHit', results: searchModule.name});  
});

module.exports = router;
