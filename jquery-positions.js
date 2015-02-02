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
    
  
    getXY = function(_direction, _type) {
      switch(_type) {
        case "abs":
          return $(this).offset()[_direction];
          break;
        case "abs-all":
          return $(this).offset();
        case "rel-all":
          return $(this).position();
        default:
          return $(this).position()[_direction];
      }
    },
  
    xyPosition = function(_options) {
      var
        opt = $.extend({
          val: (isNaN(_options) ? null : _options),
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
          // Both x and y
          setTimeout(function(_my) {
            $this.animate({
              left: opt.x,
              top: opt.y
            }, opt.duration, opt.fn);
          }, (opt.stepDuration * index) );
        }
        else {
          // Just one direction
          
          if(arguments.length === 2) {
            
          }
          else {
            switch(type) {
              case "number":
                $this.animate({
                  left: (opt.direction === 'left')? _options: getXY.call(element, 'left'),
                  top: (opt.direction === 'top')? _options: getXY.call(element, 'top')
                }, opt.duration, opt.fn);
                break;
              case "string":
                return getXY.call(element, opt.direction, _options);
                break;
              default:
                return getXY.call(element, opt.direction);
            }
          }
        }
      });

      return this;
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

      if (_arg === undefined) {
        // return X OR Y Position
        return xyPosition.call(self, options);
      }
      else if(_arg.length === 1) {
        // Checks for Number OR String values
        return xyPosition.call(self, $.extend(optSetXY(options, directionValue), {
          relativeTo: (isString(_arg[0])) ? _arg[0] : undefined
        }));
      }
      else if(_arg.length === 2) {
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
    innerXY.call(this, arguments, 'left');
  };

  $.fn.y = function() {
    innerXY.call(this, arguments, 'top');
  };

  $.fn.xy = function(options) {
    var opt;

    if (_arguments === undefined) {
      // return {} of x&y position
    }
    else if(_arguments.length === 1) {
      // return {} of x&y position
    }
    else if(_arguments.length === 2) {
      // return this
    }
    else if(_arguments.length === 3) {
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

$element.x();
$element.x(10);
$element.x('abs');
$element.x(10, {
  duration: 0,
  stepDuration: 0,
  fn: $.noop()
});


$element.xy();
$element.xy('abs');
$element.xy(10, 100);
$element.xy(10, 100, {
  duration: 0,
  stepDuration: 0,
  fn: $.noop()
});

*/