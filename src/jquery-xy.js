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
          finalValue: undefined,
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
          opt.finalValue = getXY.call(element, opt.direction, opt.relativeTo);
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
      return (jpn.isNumber(opt.finalValue) || jpn.isObject(opt.finalValue)) ? opt.finalValue : this;
    },

    /**
     *
     * @param {Object} opt
     * @param {Number} value
     * @returns {Object}
     */
    optSetXorY = function(opt, value) {
      var od = opt.direction;

      return $.extend(opt, {
        x: (od === 'left' || od === 'both') ? value : undefined,
        y: (od === 'top' || od === 'both') ? value : undefined
      });
    },

    /**
     *
     * @param {Array} _arg
     *   0: []
     *   1: [Number] OR [String]
     *   2: [Number, Object]
     * @param {String} _direction
     * @param {Object} _xyOptions
     * @returns {Function|String}
     */
    innerXY = function(_arg, _direction, _xyOptions) {
      var
        directionValue = undefined,
        self = this,
        options = $.extend({
          direction: _direction,
          status: 'get-pos'
        }, _xyOptions);

      // Checks if argument 1 is a Number
      if ( jpn.isNumber(_arg[0]) ) {
        directionValue = _arg[0];
      }

      if (_arg.length < 1) {
        // Undefined
        return xyPosition.call(self, options);

      }
      else if (_arg.length === 1) {
        // x OR y: Number OR String
        // x & y: Number OR String
        if (jpn.isNumber(_arg[0])) {
          options.status = 'set-pos';
          return xyPosition.call(self, optSetXorY(options, directionValue));
        }
        else if (jpn.isString(_arg[0])) {
          options.relativeTo = _arg[0] + ((options.direction === 'both') ? '-all': '');
          return xyPosition.call(self, options);
        }
        else {
          throw 'Expected Number OR String';
        }
      }
      else if (_arg.length === 2 || _arg.length === 3) {
        // Number, Object
        if (options.direction === 'both') {
          if (jpn.isNumber(_arg[0], _arg[1])) {
            options.status = 'set-pos';

            if ( jpn.isObject(_arg[2]) ) {
              $.extend(options, _arg[2]);
            }

            return xyPosition.call(this, $.extend(options, {
              x: _arg[0],
              y: _arg[1]
            }));
          }
        }
        else {
          if ( jpn.isNumber(_arg[0]) && jpn.isObject(_arg[1]) ) {
            options.status = 'set-pos';
            return xyPosition.call(self, $.extend(
              optSetXorY(options, directionValue),
              _arg[1]
            ));
          }
          else {
            throw 'Expected Number & Object';
          }
        }
      }
      else {
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
    return innerXY.call(this, arguments, 'both', {
      relativeTo: 'rel-all'
    });
  };

})();