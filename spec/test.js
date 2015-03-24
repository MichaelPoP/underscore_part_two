var myFunctions = require("../src/underscore");
var expect = require("chai").expect;
var sinon = require("sinon");

describe('extend', function() {
  it('returns the first argument', function() {
    var to = {};
    var from = {};
    var extended = myFunctions.extend(to, from);

    expect(extended).to.equal(to);
  });

  it('should extend an object with the attributes of another', function() {
    var to = {};
    var from = {a:'b'};
    var extended = myFunctions.extend(to, from);

    expect(extended.a).to.equal('b');
  });

  it('should override properties found on the destination', function() {
    var to = {a:'x'};
    var from = {a:'b'};
    var extended = myFunctions.extend(to, from);

    expect(extended.a).to.equal('b');
  });

  it('should not override properties not found in the source', function() {
    var to = {x:'x'};
    var from = {a:'b'};
    var extended = myFunctions.extend(to, from);

    expect(extended.x).to.equal('x');
  });

  it('should extend from multiple source objects', function() {
    var extended = myFunctions.extend({x:1}, {a:2}, {b:3});

    expect(extended).to.eql({x:1, a:2, b:3});
  });

  it('in the case of a conflict, it should use the last property\'s values when extending from multiple source objects', function() {
    var extended = myFunctions.extend({x:'x'}, {a:'a', x:2}, {a:1});

    expect(extended).to.eql({x:2, a:1});
  });

  it('should copy undefined values', function() {
    var extended = myFunctions.extend({}, {a: undefined, b: null});

    expect('a' in extended && 'b' in extended).to.equal(true);
  });
});

describe('once', function() {
  it('should only run a user-defined function if it hasn\'t been run before', function() {
    var num = 0;
    var increment = myFunctions.once(function() {
      num += 1;
    });

    increment();
    increment();

    expect(num).to.equal(1);
  });
});

describe('delay', function() {
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
  });

  it('should only execute the function after the specified wait time', function() {
    var callback = sinon.spy();
    myFunctions.delay(callback, 100);

    clock.tick(99);

    expect(callback.notCalled).to.equal(true);

    clock.tick(1);

    expect(callback.calledOnce).to.equal(true);
  });

  it('should have successfully passed function arguments in', function() {
    var callback = sinon.spy();

    myFunctions.delay(callback, 100, 1, 2);
    clock.tick(100);

    expect(callback.calledWith(1, 2)).to.equal(true);
  });
});

describe('memoize', function() {
  var fib, fastFib, timeCheck, fastTime, wait;

  beforeEach(function() {
    fib = function(n) {
      if(n < 2){ return n; }
      return fib(n - 1) + fib(n - 2);
    };
    fastFib = myFunctions.memoize(fib);

    timeCheck = function(str) { return str + Date.now(); };
    fastTime = myFunctions.memoize(timeCheck);

    // Synchronous sleep function
    wait = function(t) {
      var start = Date.now();
      while ((Date.now() - start) < t){}
    };
  });

  it('a memoized function should produce the same result when called with the same arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
  });

  it('should give different results for different arguments', function() {
    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
    expect(fastFib(7)).to.equal(13);
  });

  it('should not run the function twice for the same given argument', function() {
    var firstTime = timeCheck('shazaam!');
    wait(5);
    var secondTime = fastTime('shazaam!');
    wait(5);
    expect(firstTime).to.not.equal(secondTime);
    expect(fastTime('shazaam!')).to.equal(secondTime);
  });
});
