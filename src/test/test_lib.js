const mylib=require("./utils/lib.js");
const assert = require("chai").assert;

describe("undefined object", function() {
	describe("isUndefined(undef) returns true", function() {
		it("undefind returns true", function() {
			const undef = null;
			let result = mylib.isUndefined(undef);

			assert.equal( true, result);
		});
	});
	describe("isUndefined(null)", function() {
		it("returns true", function() {
			let result = mylib.isUndefined(null);

			assert.equal( true, result, "should return true" );
		});
	});
});
