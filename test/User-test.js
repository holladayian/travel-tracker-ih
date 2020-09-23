import {
    expect
} from 'chai';
import User from '../src/User.js';
const moment = require('moment');


let sampleUser, sampleUserTrips, user, sampleToday;

describe('User', () => {
    beforeEach(() => {
        sampleUser = {
            "id": 50,
            "name": "Morey Flanders",
            "travelerType": "foodie"
        };
        sampleUserTrips = [{
                id: 76,
                userID: 7,
                destinationID: 17,
                travelers: 5,
                date: "2019/10/22",
                status: 'approved',
                duration: 3
            },
            {
                id: 77,
                userID: 7,
                destinationID: 46,
                travelers: 5,
                date: "2020/05/28",
                status: 'approved',
                duration: 2
            },
            {
                id: 84,
                userID: 7,
                destinationID: 1,
                travelers: 1,
                date: "2020/11/23",
                status: 'approved',
                duration: 3
            },
            {
                id: 97,
                userID: 7,
                destinationID: 3,
                travelers: 3,
                date: "2020/08/20",
                status: 'approved',
                duration: 4
            },
            {
                id: 98,
                userID: 7,
                destinationID: 12,
                travelers: 6,
                date: "2020/10/6",
                status: 'pending',
                duration: 3
            },
            {
                id: 123,
                userID: 7,
                destinationID: 16,
                travelers: 6,
                date: "2020/05/03",
                status: 'approved',
                duration: 7
            },
            {
                id: 145,
                userID: 7,
                destinationID: 31,
                travelers: 6,
                date: "2020/09/20",
                status: 'approved',
                duration: 5
            }
        ];
        user = new User(sampleUser);
        user.trips = sampleUserTrips;
        sampleToday = moment("2020/09/21");
    });
    describe('User Class', () => {
        it('should hold onto it\'s user data', () => {
                expect(user.id).to.equal(50);
                expect(user.name).to.equal("Morey Flanders");
                expect(user.travelerType).to.equal("foodie");
                expect(user.trips.length).to.equal(7);
            }),

            it('should return trips for the current year', () => {
                expect(user.getTripsForAYear().length).to.equal(1)
            }),

            it('should be able to search past trips', () => {
                expect(user.searchTrips('past').length).to.equal(4);
            }),

            it('should be able to search current trips', () => {
                expect(user.searchTrips('present').length).to.equal(1);
            }),

            it('should be able to search upcoming trips', () => {
                expect(user.searchTrips('upcoming').length).to.equal(0);
            }),

            it('should be able to search pending trips', () => {
                expect(user.searchTrips('pending').length).to.equal(1);
            }),

            it('should have a helper function to search pending trips', () => {
                expect(user.searchPendingTrips(sampleToday).length).to.equal(1)
            }),

            it('should have a helper function to search upcoming trips', () => {
                expect(user.searchUpcomingTrips(sampleToday).length).to.equal(0)
            }),

            it('should have a helper function to search current trips', () => {
                expect(user.searchPresentTrips(sampleToday).length).to.equal(1)
            }),

            it('should have a helper function to search past trips', () => {
                expect(user.searchPastTrips(sampleToday).length).to.equal(4)
            }),

            it('should return an empty array if nothing is passed into searchTrips', () => {
                expect(user.searchTrips()).to.deep.equal([])
            })
    })
})