/*
 * Common JS module https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc
 */

/**
 * returns true in case the object o  is not defined
 * @author {Michael Erdmann}
 * 
 * @param  {Object} {o} the object we are watching
 * @return {boolean} true if object is not defined
 * 
 * */
exports.isUndefined = function(o) {
	return o === null || typeof(o) === "undefined";
};

