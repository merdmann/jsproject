/**
 * returns true in case the object o  is not defined
 * @author {Michael Erdmann}
 * 
 * @param  {Object} {o} the object we are watching
 * @return {boolean} true if object is not defined
 * 
 */
export const isUndefined = function(o) {
	return typeof(o) === 'undefined';
};
