let fetcher = {
 fetchUser(id) {
    fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${id}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log('err', err))
},

 fetchTrips() {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
        .then(response => response.json())
        .then(data => data.trips)
        .catch(err => console.log('err', err))
    }
}

 export default fetcher
