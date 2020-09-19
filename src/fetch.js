import fetchSetter from './index.js';

let fetcher = {
 fetchUser(id) {
    fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${id}`)
        .then(response => response.json())
        .then(data => fetchSetter.setUserData(data))
        .then(this.fetchTripsForAUser())
        .catch(err => console.log('err', err))
},

 fetchTripsForAUser() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
        .then(response => response.json())
        .then(data => fetchSetter.setUserTrips(data.trips))
        .catch(err => console.log('err', err))
    },

    fetchDestination() {
        fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
            .then(response => response.json())
            .then(data => fetchSetter.setDestinations(data))
            .catch(err => console.log('err', err))
    }

}

 export default fetcher
