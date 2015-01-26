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
  
    xyPosition = function(_direction, _options) {
      var
        opt = $.extend({
          val: (isNaN(_options) ? null : _options)
        }, _options, {});

      switch(typeof _options) {
        case "number":
          $(this).animate({
            top: (_direction === 'top')? _options: getXY.call(this, 'top'),
            left: (_direction === 'left')? _options: getXY.call(this, 'left')
          }, 0);
          break;
        case "string":
          return getXY.call(this, _direction, _options);
          break;
        default:
          return getXY.call(this, _direction);
      }

      return this;
    };

  $.fn.x = function(options) {
    return xyPosition.call(this, 'left', options);
  }
  
  $.fn.y = function(options) {
    return xyPosition.call(this, 'top', options);
  };

  $.fn.xy = function(options) {
    // options:
    // {left:0, top:0}, string, num
    // Additonal : {} - animation settings
    
    switch(typeof options) {
      case "string":
        return getXY.call(this, 'all', options + '-all');
        break;
      default:
        return getXY.call(this, 'all', 'rel-all');
    }
    return this;
  }
})();

