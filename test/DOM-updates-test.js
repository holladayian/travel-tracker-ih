const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from './DOM-updates.js';

// import { expect } from 'chai';

chai.use(spies);

describe('domUpdates', () => {
    beforeEach(() => {
        chai.spy.on(domUpdates, [
            // array of domUpdate functions
        ], () => true);
    });

    afterEach(() => {
        chai.spy.restore(domUpdates);
    });

    it('should run populateCards', () => {
        domUpdates.populateCards();
        expect(domUpdates.populateCards).to.have.been.called(1)
    })
})
