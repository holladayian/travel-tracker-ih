class User {
    constructor(userDeets) {
        this.id = userDeets.id;
        this.name = userDeets.name;
        this.travelerType = userDeets.travelerType;
        this.trips = []
    }

    // assignTrips(userTripsToAssign) {
    //     this.trips = userTripsToAssign
    // }
}

export default User