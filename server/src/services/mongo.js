const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

// require('dotenv').config();

mongoose.set("strictQuery", false);


const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('mongodb connection ready')
});

mongoose.connection.on('error', (err) => {
    console.error(err)
});

async function mongoConnect() {
    console.log(MONGO_URL)
    await mongoose.connect(MONGO_URL)
};

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}