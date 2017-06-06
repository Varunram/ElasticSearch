var express = require('express');
var router = express.Router();
var json2csv = require('json2csv');
var fs = require('fs');

var searchModule = require('../search_module/search.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Twitter Data' });
});

router.post('/search-results', function(req, res) {
  searchModule.search(req.body, function(data) {
    res.render('index', { title: 'Tweets by topic', results: data });

    json2csv({data: data }, function(err, csv) {
      if (err) console.log(err);
      fs.writeFile('/Users/varunramg/Desktop/Frrole/public/data.csv', csv, function(err) {
        if (err) throw err;
        console.log(csv);
      });
    });
  });
});

router.get('/download', function(req, res){
  var file = 'public/data.csv';
  res.download(file); // Set disposition and send it.
});

module.exports = router;
