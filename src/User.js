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
}

export default User