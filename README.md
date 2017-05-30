# Twitter Scraper
A nodejs+express backend for a twitter scraper indexed by elasticsearch

## Getting Started

The logstash files for retrieving the tweets are given in the Logstash conf. Start elastic search on port 9200 and run the logstash files to query the api and update the index. Then start the backend server to query and you're up.

The node front end retrieves only the top 1000 queries from elasticsearch. This can be edited in the config of course.

Remember to ignore the warning `exceeded index limit 1000` and similar that logstash reports when `logstash.conf` is run.

In short, run
```
logstash -f logstash.conf
elasticsearch
npm start
```
and you should see the app running.
