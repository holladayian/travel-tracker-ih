let fetcher = {
 fetchUser() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/50')
    // the number at the end of the above address will be interpolated later
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log('err', err))
},

 fetchTrips() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
        .then(response => response.json())
        .then(data => console.log(data.trips[0]))
        .catch(err => console.log('err', err))
    }
}

 export default fetcher
