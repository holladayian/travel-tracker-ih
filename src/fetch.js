import fetchSetter from './index.js';
// import domUpdates from './DOM-updates.js';

let fetcher = {
 fetchUser(id) {
     const fetchedUser = `https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${id}`
     const promise =  fetch(fetchedUser)
     .then(response => response.json())
     return promise
     .catch(err => console.log('err', err))
},

 fetchTripsForAUser() {
    //  rename 
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
//  fetchUser(id) {
//     fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${id}`)
//         .then(response => response.json())
//         .then(data => fetchSetter.setUserData(data))
//         .then(this.fetchTripsForAUser())
//         // .then(this.fetchDestination())
//         // .then(data => domUpdates.greetUser(data.name))
//         .catch(err => console.log('err', err))
// },

//  fetchTripsForAUser() {
//     //  rename 
//     fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
//         .then(response => response.json())
//         .then(data => fetchSetter.setUserTrips(data.trips))
//         .then(this.fetchDestination())
//         .catch(err => console.log('err', err))
//     },

//     fetchDestination() {
//         fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
//             .then(response => response.json())
//             .then(data => fetchSetter.setDestinations(data))
//             .then(fetchSetter.fixTerribleData())
//             .catch(err => console.log('err', err))
//     }
}

 export default fetcher
