import './css/base.scss';
import fetcher from './fetch.js';
import User from './User.js';
import domUpdates from './DOM-updates.js';
const moment = require('moment');

let selectionBox = document.querySelector('.selection-box');
let calculateCost = document.querySelector('.calculate-cost');
let bookTripButton = document.querySelector('.book-requested-trip');
let requestsButton = document.querySelector('.request-button');
let tripsButton = document.querySelector('.trips-button');
let viewTrips = document.querySelector('.trips');
let viewRequests = document.querySelector('.requests');
let loginUserName = document.querySelector('.username');
let loginPassword = document.querySelector('.password');
let loginButton = document.querySelector('.login-button');
let loginArea = document.querySelector('.login-area');
let selectedDestination = document.querySelector('.input-destination');

let wantedTrip, allDestinations, user, allUsers;

window.onload = fetchAllUsers;
selectionBox.addEventListener('click', selectTimeOfTrips);
calculateCost.addEventListener('click', validateForm);
bookTripButton.addEventListener('click', bookRequestedTrip);
requestsButton.addEventListener('click', showRequests);
tripsButton.addEventListener('click', showTrips);
loginButton.addEventListener('click', validateLogIn);
loginArea.addEventListener('keyup', checkKeyup);

function fetchAllUsers() {
    let promisedAllUsers = fetcher.fetchAllUsers()

    Promise.all([promisedAllUsers])
        .then(value => {
            allUsers = value
        })
}

function checkKeyup(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        validateLogIn()
    }
}

function fetchStuff(userID) {
    let promisededUser = fetcher.fetchUser(userID);
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

function showRequests() {
    requestsButton.classList.add('hidden');
    tripsButton.classList.remove('hidden');
    viewTrips.classList.add('hidden');
    viewRequests.classList.remove('hidden');
}

function showTrips() {
    requestsButton.classList.remove('hidden');
    tripsButton.classList.add('hidden');
    viewTrips.classList.remove('hidden');
    viewRequests.classList.add('hidden');
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
    let totalSpentForAYear = totalTrips.reduce((totalPrice, trip) => {
        let costPerDuration = (trip.estimatedLodgingCostPerDay * trip.duration);
        let totalPricePerPerson = (costPerDuration + trip.estimatedFlightCostPerPerson);
        let totalPriceForTheTrip = (totalPricePerPerson * trip.travelers)
        totalPrice += totalPriceForTheTrip;
        return totalPrice
    }, 0);
    let roundedTotalWithFee = (Math.round((totalSpentForAYear * 1.1) * 100) / 100)
    domUpdates.tellMeYourMoneys(roundedTotalWithFee.toFixed(2))
}

function selectTimeOfTrips(event) {
    let selector = '';
    if (event) {
        selector = event.target.classList.value
    }
    domUpdates.populateCards(user.searchTrips(selector))
}

function validateForm() {
    let validated = true;
    const selectedDate = document.querySelector('.input-date');
    const selectedDuration = document.querySelector('.input-duration');
    const selectedTravelers = document.querySelector('.input-travelers');
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
    if (!selectedDuration.value || isNaN(+selectedDuration.value) || +selectedDuration.value < 1) {
        durationError.classList.remove('hidden');
        validated = false;
    }
    if (!selectedTravelers.value || isNaN(+selectedTravelers.value) || +selectedTravelers.value < 0) {
        travelersError.classList.remove('hidden');
        validated = false;
    }
    if (validated) {
        gatherCompletedTrip(
            moment(selectedDate.value).format('YYYY/MM/DD'),
            selectedDuration.value,
            +selectedTravelers.value + 1, /* plus 1 to include person booking */
            selectedDestination.value.split(".")[0]
        )
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
}

function calculateTripCost(desiredTrip, desiredDestination) {
    let costPerDuration = desiredTrip.gatheredDuration * desiredDestination.estimatedLodgingCostPerDay;
    let totalPricePerPerson = costPerDuration += desiredDestination.estimatedFlightCostPerPerson;
    let totalPriceForTheTrip = totalPricePerPerson * desiredTrip.gatheredTravelers;
    let roundedTripWithFee = (Math.round((totalPriceForTheTrip * 1.1) * 100) / 100)
    domUpdates.displayTripCost(roundedTripWithFee.toFixed(2))
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
    postRequestedTrip();
    switchBackAfterTrip();
    alert(`Your trip to ${allDestinations.find(location => location.id === wantedTrip.destinationID).destination} has been booked!`)
}

function postRequestedTrip() {
    let int = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wantedTrip)
    };
    let requestedTrip = fetcher.fetchTripRequest(int);
    Promise.all([requestedTrip])
        .then(() => fetchStuff(+user.id))
        .catch(err => console.log('err', err))
}

function switchBackAfterTrip() {
    bookTripButton.classList.add('hidden');
    domUpdates.hideEstimatedCosts();
    domUpdates.populateCards();
    showTrips();
}

function validateLogIn() {
    let loginArea = document.querySelector('.login');
    if (checkUserName() && loginPassword.value === 'travel2020') {
        fetchStuff(checkUserName());
        loginArea.classList.add('hidden');
        requestsButton.classList.remove('hidden');
        viewTrips.classList.remove('hidden');
    } else {
        alert("Your username or password is incorrect")
    }
}

function checkUserName() {
    if (loginUserName.value.split('traveler')[1]) {
        let userID = loginUserName.value.split('traveler')[1];
        return allUsers[0].travelers.find(user => user.id === +userID).id
    }
}

export default fetchSetter;
