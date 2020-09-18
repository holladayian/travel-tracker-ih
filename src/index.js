// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

console.log('proper clone test')

import fetcher from './fetch.js';

window.onload = fetchStuff;
// window.onload = fetcher.fetchTrips

function fetchStuff() {
    console.log('fetcher.fetchUser(50)', fetcher.fetchUser(50))
    // fetcher.fetchTrips().filter(trip => trip.userID === fetcher.fetchUser().id)
}
