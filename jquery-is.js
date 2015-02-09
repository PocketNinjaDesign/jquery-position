;"use strict";

var jpn = jpn || {};

jpn.allowJquery = true;

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
        response = true;

      // Start with third item onwards
      for (var i = 0; i < _arguments.length; i++) {
        if ( typeof _arguments[i] !== _type ) {
          response = false;
        }
      }
      return response;
    };

  // Normal Javascript

  jpn.isObject = function() {
    return isInnerWrap('object', arguments);
  };

  jpn.isNumber = function() {
    return isInnerWrap('number', arguments);
  };

  jpn.isString = function() {
    return isInnerWrap('string', arguments);
  };

  jpn.isUndefined = function() {
    return isInnerWrap('undefined', arguments);
  };

})();


// jQuery functions
$(function () {
  if(jpn.allowJquery) {
    $.isObject = function() {
      return jpn.isObject();
    };

    $.isNumber = function() {
      return jpn.isObject();
    };

    $.isString = function() {
      return jpn.isObject();
    };

    $.isUndefined = function() {
      return jpn.isObject();
    };
  }
});


(function () {
  console.log( 'isString():' );
  console.log( 'All string', jpn.isString('test', 'string') + ": Should be truthy");
  console.log( 'String and number', jpn.isString('test', 100) + ": Should be falsey");
  console.log( 'String array', jpn.isString.apply(this, ['egg', 'cheese']) + ": Should be truthy");
})();