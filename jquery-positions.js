;(function() {

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
    },
    
    isObject = function() {
      return isInnerWrap.call(this, 'object', arguments);
    },
    
    isNumber = function() {
      return isInnerWrap.call(this, 'number', arguments);
    },

    isString = function() {
      return isInnerWrap.call(this, 'string', arguments);
    },
    
    isUndefined = function() {
      return isInnerWrap.call(this, 'undefined', arguments);
    },
    
  
    getXY = function(_direction, _relativeTo) {
      var $this = $(this);
      switch(_relativeTo) {
        case "abs":
          return $this.offset()[_direction];
          break;
        case "abs-all":
          return $this.offset();
        case "rel-all":
          return $this.position();
        default:
          return $this.position()[_direction];
      }
    },
  
    xyPosition = function(_options) {
      var
        opt = $.extend({
          val: undefined,
          type: undefined,
          relativeTo: undefined,
          x: undefined,
          y: undefined,
          direction: undefined,
          stepDuration: 0,
          duration: 0,
          fn: $.noop()
        }, _options, {});
     
      $.each(this, function(index, element) {
        var $this = $(element);

        if (opt.direction === 'both') {
          
          if (isUndefined(opt.x, opt.y)) {
            if (opt.relativeTo === undefined) {
              opt.val = getXY.call(element, opt.direction, opt.relativeTo);
            }
            else {
              opt.val = getXY.call(element, opt.direction, opt.relativeTo);
            }
            return false;
          }

          if (opt.relativeTo !== undefined) {
            opt.val = getXY.call(element, opt.direction, opt.relativeTo);
            return false;
          }
          else if (isUndefined(opt.x, opt.y)) {
            
          }
          else if (isNumber(opt.x, opt.y) ) {
            setTimeout(function() {
              $this.animate({
                left: opt.x,
                top: opt.y
              }, opt.duration, opt.fn);
            }, (opt.stepDuration * index) );
          }
        }
        else {

          if (opt.relativeTo !== undefined) {
            opt.val = getXY.call(element, opt.direction, opt.relativeTo);
            return false;
          }
          else if(isUndefined(opt.x, opt.y)) {
            opt.val = getXY.call(element, opt.direction);
            return false;
          }
          else {
            $this.animate({
              left: (opt.x !== undefined)? opt.x: getXY.call(element, 'left'),
              top: (opt.y !== undefined)? opt.y: getXY.call(element, 'top')
            }, opt.duration, opt.fn);
          }

          return this;
        }
      });

      return (isNumber(opt.val) || isObject(opt.val)) ? opt.val : this;
    },

    /**
     * 
     * @param {Object} opt
     * @param {Number} value
     * @returns {Object}
     */
    optSetXY = function(opt, value) {
      return $.extend(opt, {
        x: (opt.direction === 'left') ? value : undefined,
        y: (opt.direction === 'top') ? value : undefined
      });
    },

    /**
     *
     * @param {Array} _arg
     *   0: []
     *   1: [Number] OR [String]
     *   2: [Number, Object]
     * @param {String} _direction
     * @returns {Function|String}
     */
    innerXY = function(_arg, _direction) {
      var
        directionValue = undefined,
        self = this,
        options = {
          direction: _direction
        },
        animOptions = {};

      // Checks if argument 1 is a Number
      if ( isNumber(_arg[0]) ) {
        directionValue = _arg[0];
      }

      if (_arg.length < 1) {
        // Undefined 'get-pos'
        // return X OR Y Position
        return xyPosition.call(self, options);
      }
      else if(_arg.length === 1) {
        // Num - 'set-pos'
        // String - 'get-pos'
        // Checks for Number OR String values
        return xyPosition.call(self, $.extend(optSetXY(options, directionValue), {
          relativeTo: (isString(_arg[0])) ? _arg[0] : undefined
        }));
      }
      else if(_arg.length === 2) {
        // Num, Function - 'set-anim-pos'
        // Animate to position then return this
        
        if ( isObject(_arg[1]) ) {
          animOptions = _arg[1];
        }

        return xyPosition.call(self, $.extend(
          optSetXY(options, directionValue),
          animOptions
        ));
      }
      else {
        return 'incorrect arguments';
      }
    };

    
  
  $.fn.x = function() {
    return innerXY.call(this, arguments, 'left');
  };

  $.fn.y = function() {
    return innerXY.call(this, arguments, 'top');
  };

  $.fn.xy = function() {
    var opt = {
      direction: 'both'
    };
    
    if (arguments.length < 1) {
      // return {} of x&y position
      return xyPosition.call(this, opt);
    }
    else if(arguments.length === 1) {
      opt.relativeTo = (isString(arguments[0])) ? arguments[0] + '-all' : 'rel-all';
      return xyPosition.call(this, opt);
      // return {} of x&y position
    }
    else if(arguments.length === 2) {
      // return this
    }
    else if(arguments.length === 3) {
      // return this
    }
    else {
      return 'incorrect arguments';
    }

    /*
    if (options === undefined || arguments.length === 1) {
      opt = options;
      switch(typeof opt) {
        case "string":
          return getXY.call(this, 'all', opt + '-all');
          break;
        default:
          return getXY.call(this, 'all', 'rel-all');
      }
    }
    else if(arguments.length === 2) {
      if (isNumber.apply(this, arguments)) {
        xyPosition.call(this, $.extend({
          x: arguments[0],
          y: arguments[1],
          direction: 'both'
        }));
      }
    }
    else if (arguments.length === 3) {
      if ( isNumber.apply(this, [arguments[0], arguments[1]]) && isObject.apply(this, arguments[2]) ) {
        xyPosition.call(this, $.extend({
            x: arguments[0],
            y: arguments[1],
            direction: 'both'
          }, arguments[2]));
      }
    }
    */

    return this;
  };
})();


/*
 * directions: (left, top) OR both
 * 
 * ACTIONS
 * get-pos
 * set-pos
 * set-anim-pos
 * 
 * 
 * /
// Undefined 'get-pos'
$element.x();

// Number 'set-pos'
$element.x(10);

// String 'get-pos'
$element.x('abs');

// Num, Object - 'set-anim-pos'
$element.x(10, {
  duration: 0,
  stepDuration: 0,
  fn: $.noop()
});


// Undefined - 'get-pos'
$element.xy();
        
// Num, Num - 'set-pos'
$element.xy(10, 100);

// String - 'get-pos'
$element.xy('abs');

// Num, Num, Object - 'set-anim-pos'
$element.xy(10, 100, {
  duration: 0,
  stepDuration: 0,
  fn: $.noop()
});

*/