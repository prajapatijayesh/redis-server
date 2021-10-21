const redis = require('redis');

const subscriber = redis.createClient();

// subscribed on plain message
subscriber.on('message', (channel, msg) => {
    console.log(`Received data on ${channel}::`, msg);
});
// subscriber.subscribe('alert');
// subscriber.subscribe('alert:info');

// subscribed on pattern 
subscriber.on('pmessage', (pattern, channel, message) => {
    console.log(`Received data on channel - ${channel}::`, message);
});
subscriber.psubscribe('alert:*');
