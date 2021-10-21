const redis = require('redis');

// hostname and port
// 127.0.0.1 and 6379 
const client = redis.createClient();

// connection
const connect = () => new Promise((resolve, reject) => {
    client.on('connect', function () {
        console.log('Connected!');
        resolve();
    });
});

const init = async () => {
    await connect();
    console.log(client.connected);
}
init();

// HSET
const setCurrencyCode = async () => {
    const currencyCode = [{
        country: 'India',
        code: 'INR'
    }, {
        country: 'USA',
        code: 'USD'
    }, {
        country: 'Japan',
        code: 'Yen'
    }, {
        country: 'UnitedArabEmirates',
        code: 'AED'
    }, {
        country: 'Switzerland',
        code: 'CHE'
    }];

    if (!client.connected) {
        await connect();
    }
    currencyCode.forEach((x) => {
        client.hset('currencyCode', x.country, x.code, function (err, response) {
            if (err) {
                console.log('error', err);
            }
            // console.log('setCurrencyCode: success', response);
        })
    })
}

// HGET 
const getCurrencyCode = async (key, field) => {
    if (!client.connected) {
        await connect();
    }
    client.hget(key, field, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log('getCurrencyCode::', response);
        }
    })
}

// HGETALL
const getAllCurrencyCode = async (key) => {
    if (!client.connected) {
        await connect();
    }
    client.hgetall(key, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            console.log('getAllCurrencyCode::', response);
        }
    })
}


// SET
const setCountries = async () => {
    const countryList = [{
        country: 'India'
    }, {
        country: 'USA'
    }, {
        country: 'Japan'
    }, {
        country: 'UAE'
    }, {
        country: 'Switzerland'
    }];

    if (!client.connected) {
        await connect();
    }
    countryList.forEach(x => {
        client.sadd('country', JSON.stringify(x.country), (err, response) => {
            if (err) {
                console.log('error', err);
            }
            // console.log('setCountries: success', response);
        })
    })
}

// setCountries();
// setCurrencyCode();

getCurrencyCode('currencyCode', 'India');
getAllCurrencyCode('currencyCode');