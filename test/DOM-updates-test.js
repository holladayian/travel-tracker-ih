const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/DOM-updates.js';


chai.use(spies);

describe('domUpdates', () => {
    beforeEach(() => {
        chai.spy.on(domUpdates, [
            'populateCards',
            'greetUser',
            'tellMeYourMoneys',
            'updateListBox',
            'displayTripCost',
            'displayTripImage'
        ], () => true);
    });

    afterEach(() => {
        chai.spy.restore(domUpdates);
    });

    it('should run populateCards', () => {
        domUpdates.populateCards();
        expect(domUpdates.populateCards).to.have.been.called(1)
    }),

    it('should run greetUser', () => {
        domUpdates.greetUser();
        expect(domUpdates.greetUser).to.have.been.called(1)
    }),

    it('should run tellMeYourMoneys', () => {
        domUpdates.tellMeYourMoneys();
        expect(domUpdates.tellMeYourMoneys).to.have.been.called(1)
    }),

    it('should run updateListBox', () => {
        domUpdates.updateListBox();
        expect(domUpdates.updateListBox).to.have.been.called(1)
    }),

    it('should run displayTripCost', () => {
        domUpdates.displayTripCost();
        expect(domUpdates.displayTripCost).to.have.been.called(1)
    }),

    it('should run displayTripImage', () => {
        domUpdates.displayTripImage();
        expect(domUpdates.displayTripImage).to.have.been.called(1)
    })
})
