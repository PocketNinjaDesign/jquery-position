;(function () {

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

  $.isObject = function() {
    return isInnerWrap.call(this, 'object', arguments);
  };

  $.isNumber = function() {
    return isInnerWrap.call(this, 'number', arguments);
  };

  $.isString = function() {
    return isInnerWrap.call(this, 'string', arguments);
  };

  $.isUndefined = function() {
    return isInnerWrap.call(this, 'undefined', arguments);
  };

})();