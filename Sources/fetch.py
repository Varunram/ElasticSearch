import json

import os
import twitter
from elasticsearch import Elasticsearch

#
# Create Twitter Stream by Twitter OAuth in OS environment.
#
def connect_twitter_stream():
    """
    You need to set os environment like 'export TWITTER_CONSUMER_KEY=YOUR KEY'.
    """
    consumer_key = "RYsBPA2yrfg3nmzTzDVLIfclh"
    consumer_secret = "cYru5t9bvNphEWZFjpKcYG2eyWy9pJztJ2ax9ZqHIXcaOBYTey"
    access_token = "868895111488221185-r5iuZYva78PDdGGLG7Afo9ltRktVw91"
    access_secret= "yXfg25JQXBXDBsMKT3nT59ajLOlLPoTx4aX9jPcv3A84s"
    auth = twitter.OAuth(token=access_token,
                         token_secret=access_secret,
                         consumer_key=consumer_key,
                         consumer_secret=consumer_secret)
    return twitter.TwitterStream(auth=auth)


def put_stream(es, twitter_stream):
    tweets = twitter_stream.statuses.sample()
    # tweets = twitter_stream.statuses.filter(track='Google', language="ja")
    for tweet in tweets:
        try:
            if 'lang' in tweet and tweet['lang'] == 'en':
                dic = {
                    'tweet_id': tweet['id'],
                    'screen_name': tweet['user']['screen_name'],
                    'text': tweet['text']
                }
                if tweet['entities']['hashtags']:
                    # hash tags is array.
                    dic['hashtags'] = tweet['entities']['hashtags']

                es.index(index="twitter", doc_type='tweet', body=dic)
                # dict to JSON.
                print(json.dumps(dic, ensure_ascii=False))
        except:
            pass


if __name__ == '__main__':
    es = Elasticsearch()
    twitter_stream = connect_twitter_stream()
    put_stream(es, twitter_stream)
