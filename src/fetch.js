let fetcher = {
 fetchUser(id) {
    fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${id}`)
        .then(response => response.json())
        .then(data => this.fetchTripsForAUser(data))
        .catch(err => console.log('err', err))
},

 fetchTripsForAUser(userData) {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
        .then(response => response.json())
        .then(data => console.log(data.trips.filter(trips => trips.userID === userData.id)))
        .catch(err => console.log('err', err))
    }
}

 export default fetcher
