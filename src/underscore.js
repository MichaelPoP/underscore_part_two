var myFunctions = {


   extend: function(obj) {
    for(var i = 1; i < arguments.length; i++) {
      for(var prop in arguments[i]) {
        if(arguments[i].hasOwnProperty(prop)) {
          obj[prop] = arguments[i][prop];
        }
      }
    }

    return obj;
  },

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  once: function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  },


  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  delay: function(func, wait) {
  //create an array of arguments starting with index 2 (skip the function and timeout)
    var args = Array.prototype.slice.apply(arguments,[2]);
    //set a timeout and call the function and use the window object for "this" (doesn't matter if null or undefined...well sort of because we're not in strict mode)
    setTimeout(function(){
      func.apply(this,args);
    },wait);
  },

  memoize: function(func) {
    var cache = {};
    return function() {
      var args = Array.prototype.slice.call(arguments);

      if(args in cache) {
        return cache[args];
      }
      else {
        return (cache[args] = func.apply(this,args));
      }

    };

  }


};
module.exports = myFunctions;
