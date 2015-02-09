describe('IS', function() {

  describe('Object', function() {
    beforeEach(function() {
    });

    it("returns true if the argument is a single object", function() {
      expect(jpn.isObject({})).toBeTruthy();
    });

    it("returns true if the arguments are many object's", function() {
      expect(jpn.isObject({}, {}, {}, {})).toBeTruthy();
    });

    it("returns false if the argument is a number", function() {
      expect(jpn.isObject(100)).toBeFalsy();
    });

    it("returns false if 1 of the arguments is a string", function() {
      expect(jpn.isObject({}, {}, 'a string')).toBeFalsy();
    });
  });

  describe('Number', function() {
    beforeEach(function() {
    });

    it("returns true if the argument is a single number", function() {
      expect(jpn.isNumber(100)).toBeTruthy();
    });

    it("returns true if the arguments are many number's", function() {
      expect(jpn.isNumber(1,2,3,4,5,6,7,8)).toBeTruthy();
    });

    it("returns false if the argument is a string", function() {
      expect(jpn.isNumber('String')).toBeFalsy();
    });

    it("returns false if 1 of the arguments is an object", function() {
      expect(jpn.isNumber(1, 2, {})).toBeFalsy();
    });
  });

  describe('String', function() {
    beforeEach(function() {
    });

    it("returns true if the argument is a single string", function() {
      expect(jpn.isString('string')).toBeTruthy();
    });

    it("returns true if the arguments are many string's", function() {
      expect(jpn.isString('I', 'am', 'a', 'string')).toBeTruthy();
    });

    it("returns false if the argument is an array", function() {
      expect(jpn.isString([])).toBeFalsy();
    });

    it("returns false if 1 of the arguments is an array", function() {
      expect(jpn.isString('a', 'string', [])).toBeFalsy();
    });
  });

  describe('jpn.isArray', function() {
    beforeEach(function() {
    });

    it("returns true if the argument is a single array", function() {
      expect(jpn.isArray([1])).toBeTruthy();
    });

    it("returns true if the arguments are many array's", function() {
      expect(jpn.isArray([],[],[],[])).toBeTruthy();
    });

    it("returns false if the argument is a string", function() {
      expect(jpn.isArray('a string')).toBeFalsy();
    });

    it("returns false if 1 of the arguments is a number", function() {
      expect(jpn.isArray([],[],1)).toBeFalsy();
    });
  });

  describe("jpn.isUndefined", function() {
    var egg, cheese;
    
    beforeEach(function() {
    });

    it("returns true if the argument is a single undefined", function() {
      expect(jpn.isUndefined(undefined)).toBeTruthy();
    });

    it("returns true if the arguments are many undefined's and undefined variables", function() {
      expect(jpn.isUndefined(undefined,undefined,egg,cheese)).toBeTruthy();
    });

    it("returns false if the argument is a string", function() {
      expect(jpn.isUndefined('a string')).toBeFalsy();
    });

    it("returns false if 1 of the arguments is a number", function() {
      expect(jpn.isUndefined(undefined,undefined,1)).toBeFalsy();
    });
  });
});