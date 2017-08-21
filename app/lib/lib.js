/**
 * Check wether the item is undefined.
 * 
 * @param {any} o  the object
 * @return {boolean}  true if undefined
 */

const isUndefined = function(o) {   
    return typof(o) === 'undefined';   
}
