import './css/base.scss';
import fetcher from './fetch.js';
import User from './User.js';
import domUpdates from './DOM-updates.js';
const moment = require('moment');


let selectionBox = document.querySelector('.selection-box');
let calculateCost = document.querySelector('.calculate-cost');
let bookTripButton = document.querySelector('.book-requested-trip');

let wantedTrip, allDestinations, user;

window.onload = fetchStuff;
selectionBox.addEventListener('click', clickLog);
calculateCost.addEventListener('click', validateForm);
bookTripButton.addEventListener('click', bookRequestedTrip);

function fetchStuff() {
    let promisededUser = fetcher.fetchUser(7);
    // should pass in number as variabler to be dynamiv for laters
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
        domUpdates.updateListBox(allDestinations.map(location => {
            return {
                destination: location.destination,
                id: location.id
            }
        }))
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

function findAmountSpentOnAYear(totalTrips) {
    let totalSpentForATrip = totalTrips.reduce((totalPrice, trip) => {
        let costPerDuration = (trip.estimatedLodgingCostPerDay * trip.duration);
        let totalPricePerPerson = (costPerDuration + trip.estimatedFlightCostPerPerson);
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
    let validated = true;
    const selectedDate = document.querySelector('.input-date');
    const selectedDuration = document.querySelector('.input-duration');
    const selectedTravelers = document.querySelector('.input-travelers');
    const selectedDestination = document.querySelector('.input-destination');
    const dateError = document.querySelector('.date-error');
    const durationError = document.querySelector('.duration-error');
    const travelersError = document.querySelector('.travelers-error');
    dateError.classList.add('hidden');
    durationError.classList.add('hidden');
    travelersError.classList.add('hidden');
    if (!moment(selectedDate.value)._isValid || moment(selectedDate.value).isBefore(moment(Date.now()))) {
        dateError.classList.remove('hidden');
        validated = false;
    }
    if (!selectedDuration.value || isNaN(+selectedDuration.value)) {
    // if (!selectedDuration.value || typeof(+selectedDuration.value) !== 'number') {
        durationError.classList.remove('hidden');
        validated = false;
    }
    if (!selectedTravelers.value || isNaN(+selectedTravelers.value)) {
    // if (!selectedTravelers.value || typeof(+selectedTravelers.value) !== 'number') {
        travelersError.classList.remove('hidden');
        validated = false;
    }
    if (validated) {
        gatherCompletedTrip(moment(selectedDate.value).format('YYYY/MM/DD'), selectedDuration.value, selectedTravelers.value, selectedDestination.value.split(".")[0])
    }
}

function gatherCompletedTrip(date, duration, travelers, destinationID) {
    let foundDestination = allDestinations.find(singleDestination => singleDestination.id === +destinationID);
    let completedTrip = {
        gatheredDate: date,
        gatheredDuration: duration,
        gatheredTravelers: travelers,
        gatheredDestination: destinationID,
        gatheredImage: foundDestination.image,
        gatheredAlt: foundDestination.alt
    }
    domUpdates.displayTripImage(foundDestination.image, foundDestination.alt);
    calculateTripCost(completedTrip, foundDestination);
    buildATrip(completedTrip);
    console.log(completedTrip)
}

function calculateTripCost(desiredTrip, desiredDestination) {
    let costPerDuration = desiredTrip.gatheredDuration * desiredDestination.estimatedLodgingCostPerDay;
    let totalPricePerPerson = costPerDuration += desiredDestination.estimatedFlightCostPerPerson;
    let totalPriceForTheTrip = totalPricePerPerson * desiredTrip.gatheredTravelers;
    domUpdates.displayTripCost((totalPriceForTheTrip * 1.1))
}

function buildATrip(desiredTrip) {
    wantedTrip = {
        id: Date.now(),
        userID: +user.id,
        destinationID: +desiredTrip.gatheredDestination,
        travelers: +desiredTrip.gatheredTravelers,
        date: desiredTrip.gatheredDate,
        duration: +desiredTrip.gatheredDuration,
        status: 'pending',
        suggestedActivities: []
    }
        bookTripButton.classList.remove('hidden')
}

function bookRequestedTrip() {
    let int = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wantedTrip)
    };
    let requestedTrip = fetcher.fetchTripRequest(int);
    Promise.all([requestedTrip])
        .then(fetchStuff())
    // console.log(requestedTrip)
}



export default fetchSetter;
