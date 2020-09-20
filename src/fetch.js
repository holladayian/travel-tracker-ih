import fetchSetter from './index.js';

let fetcher = {
 fetchUser(id) {
     const fetchedUser = `https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${id}`
     const promise =  fetch(fetchedUser)
     .then(response => response.json())
     return promise
     .catch(err => console.log('err', err))
},

 fetchTripsForAUser() {
    const fetchedAllTrips = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips'
    const promise = fetch(fetchedAllTrips)
    .then(response => response.json())
    return promise
    .catch(err => console.log('err', err))
    },

    fetchDestination() {
        const fetchedAllDestinations = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations'
        const promise = fetch(fetchedAllDestinations)
        .then(response => response.json())
        return promise
        .catch(err => console.log('err', err))
    }
}

 export default fetcher
