/**
 * 
 */
require('../../../app/lib');

const chai = require('Chai');
const expect = chai.expect;

describe('undefined object', function() {
    it( 'should return true', function() {
        let undefined;
        let defined = 'Hallo';

        let result = is_undefined(undefined);

        expect(result).to.equal(true);
    });
});
