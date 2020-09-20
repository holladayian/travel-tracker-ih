// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import fetcher from './fetch.js';
import User from './User.js';
import domUpdates from './DOM-updates.js'

let tripsToDisplay, allDestinations, user;

window.onload = fetchStuff;
window.addEventListener('click', clickLog);

function fetchStuff() {
    let promisededUser = fetcher.fetchUser(7);
    let promisededAllTrips = fetcher.fetchTripsForAUser();
    let promisededAllDestinations = fetcher.fetchDestination();

    Promise.all([promisededUser, promisededAllTrips, promisededAllDestinations])
    .then(values => {
        console.log(values)
        fetchSetter.setUserData(values[0]);
        fetchSetter.setUserTrips(values[1].trips, values[0]);
        fetchSetter.setDestinations(values[2].destinations);

    })
    // fetcher.fetchDestination();
}

let fetchSetter = {
    setUserData(fetchedUserData) {
        user = new User(fetchedUserData);
        domUpdates.greetUser(user.name)
    },
    setUserTrips(fetchedTrips, fetchedUser) {
        user.trips = fetchedTrips.filter(fetchedTrip => fetchedTrip.userID === fetchedUser.id)
    },

    setDestinations(fetchedDestinations) {
        allDestinations = fetchedDestinations;
        console.log(allDestinations)
    },

    fixTerribleData() {
        console.log(allDestinations);
        user.trips.forEach(trip => {
            let foundDestination = allDestinations.find(singleDestination => singleDestination.id === trip.destinationID);
            trip.destination = foundDestination.destination;
            trip.estimatedLodgingCostPerDay = foundDestination.estimatedLodgingCostPerDay;
            trip.estimatedFlightCostPerPerson = foundDestination.estimatedFlightCostPerPerson;
            trip.image = foundDestination.image;
            trip.alt = foundDestination.alt;
        })

    }


}

function whichTripsToDisplay(tripStatus) {
    tripsToDisplay = user.trips.filter(userTrip => userTrip.status === tripStatus)
}

function clickLog() {
    console.log("user", user)
    console.log("fetchSetter.fixTerribleData()", fetchSetter.fixTerribleData())
    console.log("user.trips", user.trips)
}

export default fetchSetter;
// export default allDestinations;