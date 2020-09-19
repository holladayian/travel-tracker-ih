import { expect } from 'chai';
import User from '../src/User.js';

let sampleUser, sampleUserTrips, user;


describe('User', () => {
    beforeEach(() => {
        sampleUser = {
            "id": 50,
            "name": "Morey Flanders",
            "travelerType": "foodie"
            };
        sampleUserTrips = [
            {id: 76, userID: 7, destinationID: 17, travelers: 5, date: "2019/10/22", status: 'approved'},
            {id: 77, userID: 7, destinationID: 46, travelers: 5, date: "2020/05/28", status: 'approved'},
            {id: 84, userID: 7, destinationID: 1, travelers: 1, date: "2020/11/23", status: 'approved'},
            {id: 97, userID: 7, destinationID: 3, travelers: 3, date: "2020/08/20", status: 'approved'},
            {id: 98, userID: 7, destinationID: 12, travelers: 6, date: "2020/10/6", status: 'approved'},
            {id: 123, userID: 7, destinationID: 16, travelers: 6, date: "2020/05/03", status: 'approved'},
            {id: 145, userID: 7, destinationID: 31, travelers: 6, date: "2020/04/01/", status: 'approved'}
        ];
        user = new User(sampleUser);
        user.trips = sampleUserTrips;

        // user.trips = sampleUserTrips;
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
        })
        

        // it('should assign it\'s trip data', () => {
        //     expect(user.trips.length).to.equal(0);
        //     user.trips = sampleUserTrips;
        //     expect(user.trips.length).to.equal(7);
        // })
    })


})