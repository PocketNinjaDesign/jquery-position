;(function() {

  var

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
          status: undefined,
          relativeTo: undefined,
          x: undefined,
          y: undefined,
          direction: undefined,
          stepDuration: 0,
          duration: 0,
          complete: $.noop()
        }, _options, {});

      $.each(this, function(index, element) {
        var
          $this = $(element);

        if (opt.status === 'get-pos') {
          opt.val = getXY.call(element, opt.direction, opt.relativeTo);
          return false;
        }
        else if (opt.status === 'set-pos') {
          setTimeout(function() {
              $this.stop().animate({
                left: opt.x,
                top: opt.y
              }, opt.duration, opt.complete);
            }, (opt.stepDuration * index)
          );
        }
      });

      // Return a Value, Object or this
      return ($.isNumber(opt.val) || $.isObject(opt.val)) ? opt.val : this;
    },

    /**
     *
     * @param {Object} opt
     * @param {Number} value
     * @returns {Object}
     */
    optSetXorY = function(opt, value) {
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
          direction: _direction,
          status: 'get-pos'
        };

      // Checks if argument 1 is a Number
      if ( $.isNumber(_arg[0]) ) {
        directionValue = _arg[0];
      }

      switch(_arg.length) {
        case 0:
          // Undefined
          return xyPosition.call(self, options);

        case 1:
          // Number OR String
          if ($.isNumber(_arg[0])) {
            options.status = 'set-pos';
          }
          else if ($.isString(_arg[0])) {
            options.relativeTo = _arg[0];
          }
          else {
            throw 'Expected Number OR String';
            return null;
          }
          return xyPosition.call(self, optSetXorY(options, directionValue));

        case 2:
          // Number, Object
          if ( $.isNumber(_arg[0]) && $.isObject(_arg[1]) ) {
            options.status = 'set-pos';
            return xyPosition.call(self, $.extend(
              optSetXorY(options, directionValue),
              _arg[1]
            ));
          }
          else {
            throw 'Expected Number & Object';
          }

        default:
          throw 'Incorrect number of arguments';
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
      direction: 'both',
      status: 'get-pos',
      relativeTo: 'rel-all'
    };

    if (arguments.length < 1) {
      // Undefined
      return xyPosition.call(this, opt);
    }
    else if(arguments.length === 1) {
      // String
      if ( $.isString(arguments[0]) ) {
        opt.relativeTo = arguments[0] + '-all';
        return xyPosition.call(this, opt);
      }
      else {
        throw 'Expected String';
      }
    }
    else if(arguments.length === 2 || arguments.length === 3) {
      // Numbers x AND y
      // Numbers x AND y AND Object
      if ($.isNumber(arguments[0], arguments[1])) {
        opt.status = 'set-pos';

        if ( $.isObject(arguments[2]) ) {
          $.extend(opt, arguments[2]);
        }

        return xyPosition.call(this, $.extend(opt, {
          x: arguments[0],
          y: arguments[1]
        }));
      }
      else {
        throw 'Expected 2 Numbers & OR Object';
      }
    }
    else {
      return 'Incorrect number of arguments';
    }

    return this;
  };
})();