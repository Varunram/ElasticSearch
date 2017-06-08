var express = require('express');
var router = express.Router();
var clearbit = require('clearbit')('sk_183025a993ca86ab5595c5cb22374888');
console.log("Running fine!!!");

var Person = clearbit.Person;

module.exports.search = function(searchData){
  Person.find({email: searchData.searchTerm})
    .then(function (person) {
      name = person.name.fullName;
      console.log("EXPORT: ", name);
      // console.log('Name: ', name);
    });
}
