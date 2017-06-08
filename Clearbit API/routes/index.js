var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var clearbit = require('clearbit')('sk_183025a993ca86ab5595c5cb22374888');
var Person = clearbit.Person;
var results1 = new Array();

router.get('/', function(req, res) {
    res.render('index', {
        title: 'Clearbit Data'
    });
});
router.post('/get-clearbit', function(req, res) {
    inputArray = req.body.searchTerm.split(",");
    for (var i = 0; i < inputArray.length; i++) {
        Person.find({
            email: inputArray[i]
        }).nodeify(function(err, person) {
            if (err) {
                console.log(err);
            } else {
                results1.push(person.name.fullName);
                console.log(results1);
            }
        })
    }
    res.render('index', {
        title: 'Clearbit Search',
        results: results1
    });
});

module.exports = router;
