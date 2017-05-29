var elasticsearch = require('elasticsearch');

var client = elasticsearch.Client({
  hosts: [
    'http://localhost:9200'
  ]
});

module.exports.search = function(searchData, callback) {
  client.search({
    index: 'modi',
    type: 'tweetlist',
    body: {
        "from": 0,
        "size": 1000,
        "query": {
          "query_string": {
            "query": searchData.searchTerm,
            "boost": 1.0,
            "fuzziness": 2,
          }
        }
    }
  }).then(function (resp) {
    callback(resp.hits.hits);
  }, function (err) {
      callback(err.message)
      console.log(err.message);
  });
}
