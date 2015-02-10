describe("jquery.xy", function() {

  var
    fixturesHtml,
    fixtures = '#fixtures',
    fixtureBasePos = {
      x: 8,
      y: 73
    },
    fixturePos = {
      x: 100,
      y: 300
    },
    appendNewItems = function($element) {
      for (var i = 1; i < 4; i++) {
        $($element).append($('<div/>', {
            'class': 'egg',
            'id': 'egg' + i
          }).css({
            width: 200,
            height: 200,
            position: 'absolute',
            left: 0,
            top: 300 * i
          })
        );
      }
    },
    getFakeFixtures = function() {
      return '<div id="fixtures" style="position: absolute; left: ' + fixturePos.x + 'px; top: ' + fixturePos.y + 'px; width: 100px; height: 200px; background: #fc0;"></div>';
    };

  describe("jquery.x()", function() {
    beforeEach(function() {
      fixturesHtml = setFixtures(getFakeFixtures());
      //fixtures = loadFixtures('default-fixture.html');
      jasmine.clock().install();
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it("return the x position of an element relative to it's parent position", function() {
      expect($(fixtures).x()).toBe(fixturePos.x);
    });

    it("return the x position of an element from the document x/y using 'abs'", function() {
      $('#fixtures').x('abs');

      expect($(fixtures).x()).toBe(fixturePos.x);
    });

    it("set the x position of an element to 200", function() {
      $('#fixtures').x(200);
      jasmine.clock().tick(1);

      expect($(fixtures).x()).toBe(200);
    });

    it("set the x position of 3 elements to 600", function() {

      appendNewItems($('#fixtures'));

      jasmine.clock().tick(1);

      $('.egg').x(600);
      jasmine.clock().tick(1);

      expect($('#egg1').x()).toBe(600);
      expect($('#egg2').x()).toBe(600);
      expect($('#egg3').x()).toBe(600);
    });

    it("set the x position of an element to 400 with animation", function() {
      var newXPos = 400;

      $(fixtures).x(newXPos, {
        duration: 200
      });

      jasmine.clock().tick(200000);

      expect($(fixtures).x()).toBe(newXPos);
    });
  });

  describe("jquery.y()", function() {
    beforeEach(function() {
      fixturesHtml = setFixtures(getFakeFixtures());
      //fixtures = loadFixtures('default-fixture.html');
      jasmine.clock().install();
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it("return the y position of an element relative to it's parent position", function() {
      expect($(fixtures).y()).toBe(fixturePos.y);
    });

    it("return the y position of an element from the document x/y using 'abs'", function() {
      $('#fixtures').y('abs');

      expect($(fixtures).y()).toBe(fixturePos.y);
    });

    it("set the y position of an element to 200", function() {
      $('#fixtures').y(200);
      jasmine.clock().tick(1);

      expect($(fixtures).y()).toBe(200);
    });

    it("set the y position of 3 elements to 900", function() {

      appendNewItems($('#fixtures'));

      jasmine.clock().tick(1);

      $('.egg').y(900);
      jasmine.clock().tick(1);

      expect($('#egg1').y()).toBe(900);
      expect($('#egg2').y()).toBe(900);
      expect($('#egg3').y()).toBe(900);
    });

    it("set the y position of an element to 600 with animation", function() {
      var newYPos = 600;

      $(fixtures).y(newYPos, {
        duration: 200
      });

      jasmine.clock().tick(210000);

      expect($(fixtures).y()).toBe(newYPos);
    });
  });

  describe("jquery.xy()", function() {
    beforeEach(function() {
      fixturesHtml = setFixtures(getFakeFixtures());
      $(fixturesHtml).css({'position': 'absolute', 'width': 200, 'height': 200, 'background': '#f00'});
      //fixtures = loadFixtures('default-fixture.html');
      jasmine.clock().install();
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it("return the xy position of an element relative to it's parent position", function() {
      expect($(fixtures).xy().left).toBe(fixturePos.x);
      expect($(fixtures).xy().top).toBe(fixturePos.y);
    });

    it("return the xy position of an element relative to it's documents position", function() {
      expect($(fixtures).xy('abs').left).toBe(fixturePos.x + fixtureBasePos.x);
      expect($(fixtures).xy('abs').top).toBe(fixturePos.y + fixtureBasePos.y);
    });

    it("set the x & y position of an element to x:600, y:800", function() {
      $('#fixtures').xy(600, 800);
      jasmine.clock().tick(1);

      expect($(fixtures).xy().left).toBe(600);
      expect($(fixtures).xy().top).toBe(800);
    });

    it("set the x & y position of an element with 1 parameter of 1000", function() {
      $('#fixtures').xy(1000);
      jasmine.clock().tick(1);

      expect($(fixtures).xy().left).toBe(1000);
      expect($(fixtures).xy().top).toBe(1000);
    });

    it("set the x & y position of an element to x:500, y:900 with animation", function() {
      var
        newXPos = 500,
        newYPos = 900;

      $(fixtures).xy(newXPos, newYPos, {
        duration: 200
      });

      jasmine.clock().tick(210000);

      expect($(fixtures).xy().left).toBe(newXPos);
      expect($(fixtures).xy().top).toBe(newYPos);
    });
  });

});