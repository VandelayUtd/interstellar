const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();


const launch = { 
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['Drew', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);
// launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');

    if(!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
};

async function getAllLaunches() {
    return await launchesDatabase
    .find({}, { '_id': 0, '__v': 0})
};

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('no matching planet was found')
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
};

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customer: ['Drew', 'NASA'],
        flightNumber: newFlightNumber, 
    });

    await saveLaunch(newLaunch)
}


function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
};

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
};