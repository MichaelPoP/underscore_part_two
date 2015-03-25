//extend   :   _.extend(destination, *sources) 
//Copy all of the properties in the source objects
//over to the destination object, 
//and return the destination object. 
//It's in-order, so the last source will 
//override properties of the same name in previous arguments.
//=======================================
_.extend = createAssigner(_.allKeys);
//=======================================
 var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

_.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };


//========================================================================

//once  :  _.once(function) 
//Creates a version of the function that can
//only be called one time. Repeated calls
//to the modified function will have no effect,
// returning the value from the original call. 
//Useful for initialization functions, 
//instead of having to set a boolean flag and then check it later.
//=======================================
_.once = _.partial(_.before, 2);
//=======================================
// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. _ acts
// as a placeholder, allowing any combination of arguments to be pre-filled.
_.partial = function(func) {
  var boundArgs = slice.call(arguments, 1);
  var bound = function() {
    var position = 0, length = boundArgs.length;
    var args = Array(length);
    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
    }
    while (position < arguments.length) args.push(arguments[position++]);
    return executeBound(func, bound, this, this, args);
  };
  return bound;
};
//Returns a function that will only 
//be executed up to (but not including) the Nth call.
_.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

//========================================================================

//delay  :  _.delay(function, wait, *arguments) 
//Much like setTimeout, invokes function 
//after wait milliseconds. 
//If you pass the optional arguments, 
//they will be forwarded on to the function when it is invoked.
//=======================================
_.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };
//=======================================

//========================================================================
// memoize  :   _.memoize(function, [hashFunction]) 
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// If passed an optional hashFunction, 
// it will be used to compute the hash key for storing
// the result, based on the arguments to the original function. 
// The default hashFunction just uses the first argument
// to the memoized function as the key. 
// The cache of memoized values is available as the 
// cache property on the returned function.
//=======================================
_.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };
//=======================================
// Shortcut function for checking if an object
// has a given property directly
// on itself (in other words, not on a prototype).
_.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };










