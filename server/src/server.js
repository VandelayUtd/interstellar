const http = require('http');
const mongoose = require('mongoose')

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://interstellar-api:7NYYS4yVz0qpxl71@interstellarcluster.6k7fspb.mongodb.net/?retryWrites=true&w=majority'

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('mongodb connection ready')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
});

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    
    server.listen(PORT, ()=> {
        console.log(`listening on port ${PORT}`)
    });
};

startServer();


