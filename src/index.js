// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

console.log('proper clone test')

import fetcher from './fetch.js';

let userData, userTrips, tripsToDisplay;


window.onload = fetchStuff;
// window.onload = fetcher.fetchTrips
window.addEventListener('click', clickLog);

function fetchStuff() {
    fetcher.fetchUser(7);
    // fetcher.fetchTripsForAUser()
    // fetcher.fetchTrips().filter(trip => trip.userID === fetcher.fetchUser().id)
}

let userStuff = {
      setUserData(fetchedUserData) {
        userData = fetchedUserData
    },
    setUserTrips(fetchedTrips) {
        //  console.log(fetchedTrips.trips)
        userTrips = fetchedTrips.filter(fetchedTrip => fetchedTrip.userID === userData.id)
     }
}

function whichTripsToDisplay(tripStatus) {
    tripsToDisplay = userTrips.filter(userTrip => userTrip.status === tripStatus)
}




function clickLog() {
    console.log("userTrips", userTrips)
    // console.log("userData", userData)
    whichTripsToDisplay('approved');
    console.log(tripsToDisplay)
}

// export default userData;
export default userStuff;
