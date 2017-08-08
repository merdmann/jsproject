require("../../../app/lib");

const chai = require("Chai");
const expect = chai.expect;

describe("undefined object", function () {
    it( "should return true", function () {
        var undefined;
        var defined = "Hallo";

        var result = is_undefined(undefined);

        expect(result).to.equal(true);
    });
});
