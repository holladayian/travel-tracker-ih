import userStuff from './index.js';

let fetcher = {
 fetchUser(id) {
    fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${id}`)
        .then(response => response.json())
        .then(data => userStuff.setUserData(data))
        .then(this.fetchTripsForAUser())
        .catch(err => console.log('err', err))
},

 fetchTripsForAUser() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
        .then(response => response.json())
        .then(data => userStuff.setUserTrips(data.trips))
        // .then(data => console.log(data.trips.filter(trips => trips.userID === userData.id)))
        .catch(err => console.log('err', err))
    }
}

 export default fetcher
