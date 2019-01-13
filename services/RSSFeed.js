const RSS = require('rss');



let options = {
    title: 'RSS Feed Dejbox Poll',
    description: 'Event in the dejbox poll',
    language: 'FR',
    pubDate: 'May 20, 2012 04:00:00 GMT',
    ttl: '60'
}


const feed = new RSS(options);



module.exports = feed;

