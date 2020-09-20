// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import fetcher from './fetch.js';
import User from './User.js';
import domUpdates from './DOM-updates.js';

let selectionBox = document.querySelector('.selection-box');

let tripsToDisplay, allDestinations, user;

window.onload = fetchStuff;
selectionBox.addEventListener('click', clickLog);

function fetchStuff() {
    let promisededUser = fetcher.fetchUser(7);
    let promisededAllTrips = fetcher.fetchTripsForAUser();
    let promisededAllDestinations = fetcher.fetchDestination();

    Promise.all([promisededUser, promisededAllTrips, promisededAllDestinations])
    .then(values => {
        // console.log(values)
        fetchSetter.setUserData(values[0]);
        fetchSetter.setUserTrips(values[1].trips, values[0]);
        fetchSetter.setDestinations(values[2].destinations);
        fetchSetter.fixTerribleData();
        findAmountSpentOnAYear(user.trips);
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
    },

    fixTerribleData() {
        user.trips.forEach(trip => {
            let foundDestination = allDestinations.find(singleDestination => singleDestination.id === trip.destinationID);
            trip.destination = foundDestination.destination;
            trip.estimatedLodgingCostPerDay = foundDestination.estimatedLodgingCostPerDay;
            trip.estimatedFlightCostPerPerson = foundDestination.estimatedFlightCostPerPerson;
            trip.image = foundDestination.image;
            trip.alt = foundDestination.alt;
        })
        console.log(user.trips)
    }
}

function findAmountSpentOnAYear(totapTrips) {
    console.log('totapTrips', totapTrips)
        let totalSpentForATrip = totapTrips.reduce((totalPrice, trip) => {
            let costPerDuration = (trip.estimatedLodgingCostPerDay * trip.duration);
            let totalPricePerPerson = (costPerDuration += trip.estimatedFlightCostPerPerson);
            let totalPriceForTheTrip = (totalPricePerPerson * trip.travelers)
            totalPrice += totalPriceForTheTrip;
            return totalPrice
        }, 0)
        domUpdates.tellMeYourMoneys(totalSpentForATrip * 1.1)
}

function whichTripsToDisplay(tripStatus) {
    tripsToDisplay = user.trips.filter(userTrip => userTrip.status === tripStatus)
}

function clickLog(event) {
    // console.log("user", user)
    // console.log("fetchSetter.fixTerribleData()", fetchSetter.fixTerribleData())
    // console.log("user.trips", user.trips)
    // console.log('user.searchApprovedTrips(event.target.classList)', user.searchApprovedTrips(event.target.classList))
    domUpdates.populateCards(user.searchApprovedTrips(event.target.classList.value))

    // if(event.target.class)
}

export default fetchSetter;
// export default allDestinations;