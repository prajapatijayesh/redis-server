const redis = require('redis');

const publisher = redis.createClient();

const init = (channel, msg) => {
    publisher.publish(channel, JSON.stringify(msg), function (err, reply) {
        console.log('sent', reply);
        // process.exit(0);
    });
}
// init('alert', `INR deposited in a/c on ${new Date()}`);
// init('alert:info', 'object');
// init('alert:info:bank:balance', { type: 'INFO', user: { _id: 1, first_name: 'Jayesh', last_name: 'Prajapati' }, bank: { name: 'SBI', balance: '1cr' } });
let count = 0;
setInterval(() => {
    init('alert:info:bank:balance', {
        type: 'INFO',
        count: count,
        user: { _id: 1, first_name: 'Jayesh', last_name: 'Prajapati' },
        bank: { name: 'SBI', balance: '1cr' }
    });
    count++;
}, 2000);