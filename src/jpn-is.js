;"use strict";

var jpn = jpn || {};

(function () {

  var

    /**
     *
     * @param {String} _type
     * @param {Array} _arguments
     * @returns {Boolean}
     */
    isInnerWrap = function(_type, _arguments) {
      var
        objectPrototypeToString,
        objectCompare = '[object ' + _type + ']';

      for (var i = 0; i < _arguments.length; i++) {
        objectPrototypeToString = Object.prototype.toString.call(_arguments[i]);
        if ( objectPrototypeToString !== objectCompare ) {
          return false;
        }
      }
      return true;
    };

  jpn.isObject = function() {
    return isInnerWrap('Object', arguments);
  };

  jpn.isNumber = function() {
    return isInnerWrap('Number', arguments);
  };

  jpn.isString = function() {
    return isInnerWrap('String', arguments);
  };

  jpn.isArray = function() {
    return isInnerWrap('Array', arguments);
  };

  jpn.isUndefined = function() {
    return isInnerWrap('Undefined', arguments);
  };

})();