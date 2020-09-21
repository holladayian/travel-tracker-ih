// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import fetcher from './fetch.js';
import User from './User.js';
import domUpdates from './DOM-updates.js';
const moment = require('moment');


let selectionBox = document.querySelector('.selection-box');
let bookTrip = document.querySelector('.book-trip');

let tripsToDisplay, allDestinations, user;

window.onload = fetchStuff;
selectionBox.addEventListener('click', clickLog);
bookTrip.addEventListener('click', validateForm);

function fetchStuff() {
    let promisededUser = fetcher.fetchUser(7);
    let promisededAllTrips = fetcher.fetchTripsForAUser();
    let promisededAllDestinations = fetcher.fetchDestination();

    Promise.all([promisededUser, promisededAllTrips, promisededAllDestinations])
    .then(values => {
        fetchSetter.setUserData(values[0]);
        fetchSetter.setUserTrips(values[1].trips, values[0]);
        fetchSetter.setDestinations(values[2].destinations);
        fetchSetter.fixTerribleData();
        findAmountSpentOnAYear(user.trips);
    })
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
        domUpdates.updateListBox(allDestinations.map(location => location.destination))
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
    }
}

function findAmountSpentOnAYear(totapTrips) {
        let totalSpentForATrip = totapTrips.reduce((totalPrice, trip) => {
            let costPerDuration = (trip.estimatedLodgingCostPerDay * trip.duration);
            let totalPricePerPerson = (costPerDuration += trip.estimatedFlightCostPerPerson);
            let totalPriceForTheTrip = (totalPricePerPerson * trip.travelers)
            totalPrice += totalPriceForTheTrip;
            return totalPrice
        }, 0)
        domUpdates.tellMeYourMoneys(totalSpentForATrip * 1.1)
}

function clickLog(event) {
    domUpdates.populateCards(user.searchApprovedTrips(event.target.classList.value))
}

function validateForm() {
    let validated = false;
    let selectedDate = document.querySelector('.input-date');
    let selectedDuration = document.querySelector('.input-duration');
    let selectedTravelers = document.querySelector('.input-travelers');
    let selectedDestination = document.querySelector('.input-destination');
    let dateError = document.querySelector('.date-error');
    let durationError = document.querySelector('.duration-error');
    let travelersError = document.querySelector('.travelers-error');
    let destinationError = document.querySelector('.destination-error');
    dateError.classList.add('hidden');
    durationError.classList.add('hidden');
    travelersError.classList.add('hidden');
    destinationError.classList.add('hidden');
    if (!moment(selectedDate.value)._isValid || moment(selectedDate.value).isBefore(moment(Date.now()))) {
        dateError.classList.remove('hidden');
        validated = false;
    } else {
        validated = true;
    }
    if (!isNaN(selectedDuration.value)) {
        durationError.classList.remove('hidden');
        validated = false;
    } else {
        validated = true;
    }
    if (!isNaN(selectedTravelers.value)) {
        travelersError.classList.remove('hidden');
        validated = false;
    } else {
        validated = true;
    }
    if (validated) {
        console.log('validated')
    }
}

export default fetchSetter;
