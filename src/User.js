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
        let today = moment(Date.now());
        let searchedTrips;
        if (timeFrame === 'current') {
            searchedTrips = this.trips.filter(trip => today.isAfter(moment(trip.date)) && moment(trip.date).add(trip.duration, 'day').isBefore(today))
        } else if (timeFrame === 'upcoming') {
            searchedTrips =  this.trips.filter(trip => moment(trip.date).add(trip.duration, 'day').isAfter(today))
        } else if (timeFrame === 'past') {
            searchedTrips = this.trips.filter(trip => moment(trip.date).add(trip.duration, 'day').isBefore(today))
        } else if (timeFrame === 'pending') {
            searchTrips = this.searchPendingTrips()
        }
        return searchedTrips
    }

    searchPendingTrips() {
        return this.trips.filter(trip => trip.status === 'pending')
    }
}

export default User