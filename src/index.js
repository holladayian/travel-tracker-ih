// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';


import fetcher from './fetch.js';
import User from './User.js';

let tripsToDisplay, allDestinations, user;


window.onload = fetchStuff;
window.addEventListener('click', clickLog);

function fetchStuff() {
    fetcher.fetchUser(7);
    fetcher.fetchDestination();
}

let fetchSetter = {
      setUserData(fetchedUserData) {
          user = new User(fetchedUserData)
    },
    setUserTrips(fetchedTrips) {
        user.trips = fetchedTrips.filter(fetchedTrip => fetchedTrip.userID === user.id)
     },

     setDestinations(fetchedDestinations) {
        allDestinations = fetchedDestinations
     }
}

function whichTripsToDisplay(tripStatus) {
    tripsToDisplay = user.trips.filter(userTrip => userTrip.status === tripStatus)
}




function clickLog() {
    console.log("user", user)
    console.log(user.trips)
}

export default fetchSetter;
// maybe rename userStuff, maybe 
