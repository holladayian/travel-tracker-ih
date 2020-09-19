// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

console.log('proper clone test')

import fetcher from './fetch.js';

let userData, userTrips, tripsToDisplay, allDestinations;


window.onload = fetchStuff;
window.addEventListener('click', clickLog);

function fetchStuff() {
    fetcher.fetchUser(7);
    fetcher.fetchDestination();
}

let userStuff = {
      setUserData(fetchedUserData) {
        userData = fetchedUserData
    },
    setUserTrips(fetchedTrips) {
        userTrips = fetchedTrips.filter(fetchedTrip => fetchedTrip.userID === userData.id)
     },

     setDestinations(fetchedDestinations) {
        allDestinations = fetchedDestinations
     }
}

function whichTripsToDisplay(tripStatus) {
    tripsToDisplay = userTrips.filter(userTrip => userTrip.status === tripStatus)
}




function clickLog() {
    console.log("allDestinations", allDestinations)
    console.log(tripsToDisplay)
}

export default userStuff;
// maybe rename userStuff, maybe 
