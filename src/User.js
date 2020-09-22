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

    searchTrips(timeFrame) {
        let today = moment(Date.now());
        let searchedTrips = [];
        if (timeFrame === 'present') {
            searchedTrips = this.searchPresentTrips(today)
        } else if (timeFrame === 'upcoming') {
            searchedTrips = this.searchUpcomingTrips(today)
        } else if (timeFrame === 'past') {
            searchedTrips = this.searchPastTrips(today)
        } else if (timeFrame === 'pending') {
            searchedTrips = this.searchPendingTrips()
        }
        return searchedTrips
    }

    searchPastTrips(today) {
        return this.trips.filter(trip => moment(trip.date).add(trip.duration, 'day').isBefore(today))
    }

    searchUpcomingTrips(today) {
        return this.trips.filter(trip => {
            if (moment(trip.date).add(trip.duration, 'day').isAfter(today && trip.status === 'approved')) {
                return trip
            }
        })
    }

    searchPresentTrips(today) {
        return this.trips.filter(trip => {
            if (moment(trip.date).isBefore(today) && moment(trip.date).add(trip.duration, 'day').isAfter(today)) {
                return trip
            }
        })
    }

    searchPendingTrips() {
        return this.trips.filter(trip => trip.status === 'pending')
    }
}

export default User;