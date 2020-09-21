// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import fetcher from './fetch.js';
import User from './User.js';
import domUpdates from './DOM-updates.js';
const moment = require('moment');


let selectionBox = document.querySelector('.selection-box');
let calculateCost = document.querySelector('.calculate-cost');

let requestedTripObject, allDestinations, user;

window.onload = fetchStuff;
selectionBox.addEventListener('click', clickLog);
calculateCost.addEventListener('click', validateForm);

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
    let validated = true;
    // let validated = false;
    const selectedDate = document.querySelector('.input-date');
    const selectedDuration = document.querySelector('.input-duration');
    const selectedTravelers = document.querySelector('.input-travelers');
    const selectedDestination = document.querySelector('.input-destination');
    const dateError = document.querySelector('.date-error');
    const durationError = document.querySelector('.duration-error');
    const travelersError = document.querySelector('.travelers-error');
    // let destinationError = document.querySelector('.destination-error');
    dateError.classList.add('hidden');
    durationError.classList.add('hidden');
    travelersError.classList.add('hidden');
    // destinationError.classList.add('hidden');
    if (!moment(selectedDate.value)._isValid || moment(selectedDate.value).isBefore(moment(Date.now()))) {
        dateError.classList.remove('hidden');
        validated = false;
    // } else {
    //     validated = true;
    }
    if (!selectedDuration.value || typeof(+selectedDuration.value) !== 'number') {
        durationError.classList.remove('hidden');
        validated = false;
    // } else {
    //     validated = true;
    }
    if (!selectedTravelers.value || typeof(+selectedTravelers.value) !== 'number') {
        travelersError.classList.remove('hidden');
        validated = false;
    // } else {
    //     validated = true;
    }
    if (validated) {
        console.log('selectedDate.value', selectedDate.value);
        console.log('selectedDuration.value', selectedDuration.value);
        console.log('selectedTravelers.value', selectedTravelers.value);
        console.log('selectedDestination', selectedDestination.value.split(".")[0]);
        gatherCompletedTrip(moment(selectedDate.value).format('YYYY/MM/DD'), selectedDuration.value, selectedTravelers.value, selectedDestination.value.split(".")[0])
    }

    function gatherCompletedTrip(date, duration, travelers, destinationID) {
        let foundDestination = allDestinations.find(singleDestination => singleDestination.id === +destinationID);
        // console.log('allDestinations', allDestinations)
        // console.log('foundDestination', foundDestination)
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
        domUpdates.displayTripCost((totalPriceForTheTrip * 1.1))
    }

    // findNewTripID(allTrips) {
    //     let highestID = allTrips.sort((lowerTripId, higherTripId) => {
    //         return lowerTripId.id + higherTripId.id
    //     })[0].id;
    //     return (highestID + 1)
    // }

    function buildATrip(desiredTrip) {
        // let promisedAllTrips = fetcher.fetchTripsForAUser();

        requestedTripObject = {
            id: Date.now(),
            userID: user.id,
            destinationID: desiredTrip.gatheredDestination,
            travelers: desiredTrip.gatheredTravelers,
            date: desiredTrip.gatheredDate,
            duration: desiredTrip.gatheredDuration,
            status: 'pending',
            suggestedActivities: []
        }
        console.log(requestedTripObject)
        // fetcher.fetchTripRequest(findNewTripID(promisedAllTrips))
        // let requestedTrip = fetcher.postARequestedTrip();

        // Promise.all([promisedAllTrips, requestedTrip])
            // .then()
    }
}

export default fetchSetter;
