/*
;(function() {
  var xANDy = function(direction, positionsArray, options) {
    var
      align = {},
      newAlign = {},
      animateObj = {},
      opt = $.extend({
        val: (isNaN(options) ? null : options),
        getAlign: direction,
        setAlign: '',
        duration: 0,
        fn: function() {}
      }, options || {});

    direction = direction || 'left';
    positionsArray = positionsArray || ['left','center','right'];
  
    for( var i = 0; i < this.length; i++ ) {
      if (direction === 'left') {
        diameter = $(this[i]).innerWidth();
        startPos = $(this[i]).offset().left;
      }
      else if (direction === 'top') {
        diameter = $(this[i]).innerHeight();
        startPos = $(this[i]).offset().top;
      }

      align[positionsArray[0]] = startPos;
      align[positionsArray[1]] = startPos + (diameter / 2);
      align[positionsArray[2]] = startPos + diameter;

      newAlign[positionsArray[0]] = 0;
      newAlign[positionsArray[1]] = diameter / 2;
      newAlign[positionsArray[2]] = diameter;

      if(opt.val === null && opt.setAlign.length < 1) {
        // return startPos position / left or top
        return align[opt.getAlign];
      }
      else if(opt.setAlign.length > 0) {
        // align object axis to new coordinate
        animateObj[direction] = opt.val - newAlign[opt.setAlign];
        $(this[i]).animate(animateObj, opt.duration, opt.fn);
      }
      else {
        // SET to new position / left or top
        animateObj[direction] = opt.val;
        $(this[i]).animate(animateObj, opt.duration, opt.fn);
      }
    }
    
    return this;
  };

  $.fn.x = function(options) {
    return xANDy.call(this, 'left', ['left', 'center', 'right'], options);
  };
  
  $.fn.y = function(options) {
    return xANDy.call(this, 'top', ['top', 'middle', 'bottom'], options);
  };
})();
*/


;(function() {

  var
  
    isObject = function(arg) {
      var response = true;
      
      for (var i = 0; i < arguments.length; i++) {
        if ( typeof arguments[i] !== 'object' ) {
          response = false;
        }
      }
      return response;
    },
    
    isNumber = function(arg) {
      var response = true;
      
      for (var i = 0; i < arguments.length; i++) {
        if ( typeof arguments[i] !== 'number' ) {
          response = false;
        }
      }
      return response;
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
    
    innerFnXY = function(_options, _direction) {
      var
        that = this,
        opt = {
          direction: _direction
        };
      return function() {
        if (arguments.length === 1) {
          switch(typeof arguments[0]) {
            case "number":
              opt.type = 'number';
              break;
            case "string":
              opt.type = 'string';
              break;
            default:
              opt.type = undefined;
          }

          return xyPosition.call(that, arguments[0]);
        }
        else if (arguments.length === 2) {
          opt = $.extend(opt, arguments[1], {});
          return xyPosition.call(that, opt, arguments[0]);
        }
      }
    };

    
  
  $.fn.x = function(options) {
    innerFnXY.call(this, options, 'left');
  }

  $.fn.y = function(options) {
    options = $.extend({
      direction: 'top'
    }, options, {});
    return xyPosition.call(this, options, 'top');
  };

  $.fn.xy = function(options) {
    var opt;

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

    return this;
  }
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
