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