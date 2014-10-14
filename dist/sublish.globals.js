(function(root){
var require=function(key){return root[key];};
var module = {};
/*jshint es3: true */
/*global module */
function PubSub() {
  'use strict';
  if (!(this instanceof PubSub)) return new PubSub();
  this._listeners = [];
}
PubSub.prototype = {
  listen: function(fn, ctx) {
    'use strict';
    var self = this;
    function callback() {
      return fn.apply(ctx || self, arguments);
    }
    this._listeners.push(callback);
    return function() {
      for (var i = 0; i < self._listeners.length; i++) {
        if (self._listeners[i] !== callback) continue;
        self._listeners.splice(i, 1);
        return true;
      }
      return false;
    };
  },
  emit: function() {
    'use strict';
    var args = Array.prototype.slice.call(arguments, 0);
    for (var i = 0; i < this._listeners.length; i++) {
      this._listeners[i].apply(this, args);
    }
  }
};
module.exports = PubSub;
root.sublish = module.exports;
}(this));