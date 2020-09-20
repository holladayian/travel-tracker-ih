const moment = require('moment');


class User {
    constructor(userDeets) {
        this.id = userDeets.id;
        this.name = userDeets.name;
        this.travelerType = userDeets.travelerType;
        this.trips = []
    }

    getTripsForAYear() {
        let today = moment(Date.now());
        return this.trips.filter(trip => moment(trip.date).isBefore(today) && moment(trip.date).isAfter(today.subtract(1, 'year')))
    }

    searchApprovedTrips(timeFrame) {
        // this naming should probably change if it also calls this.searchPendingTrips()
        let today = moment(Date.now());
        let searchedTrips;
        if (timeFrame === 'present') {
            searchedTrips = this.trips.filter(trip => {
                if (moment(trip.date).isBefore(today) && moment(trip.date).add(trip.duration, 'day').isAfter(today)) {
                    return trip
                }
            })
        } else if (timeFrame === 'upcoming') {
            searchedTrips =  this.trips.filter(trip => {
                if(moment(trip.date).add(trip.duration, 'day').isAfter(today && trip.status === 'approved')) {
                    return trip
                }})
        } else if (timeFrame === 'past') {
            searchedTrips = this.trips.filter(trip => moment(trip.date).add(trip.duration, 'day').isBefore(today))
        } else if (timeFrame === 'pending') {
            // console.log('this.searchPendingTrips()', this.searchPendingTrips())
            searchedTrips = this.searchPendingTrips()
        }
        return searchedTrips
    }

    searchPendingTrips() {
        return this.trips.filter(trip => trip.status === 'pending')
    }
}

export default User