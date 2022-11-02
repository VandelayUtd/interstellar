const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://interstellar-api:7NYYS4yVz0qpxl71@interstellarcluster.6k7fspb.mongodb.net/?retryWrites=true&w=majority'


mongoose.connection.once('open', () => {
    console.log('mongodb connection ready')
});

mongoose.connection.on('error', (err) => {
    console.error(err)
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
};

module.exports = {
    mongoConnect
}