/*jshint es3: true */
/*global module */
function PubSub() {
  'use strict';
  if (!(this instanceof PubSub)) return new PubSub();
  this._subscribers = [];
}
PubSub.prototype = {
  subscribe: function(fn, ctx) {
    'use strict';
    var self = this;
    function callback() {
      return fn.apply(ctx || self, arguments);
    }
    this._subscribers.push(callback);
    return function() {
      for (var i = 0; i < self._subscribers.length; i++) {
        if (self._subscribers[i] !== callback) continue;
        self._subscribers.splice(i, 1);
        return true;
      }
      return false;
    };
  },
  publish: function() {
    'use strict';
    var args = Array.prototype.slice.call(arguments, 0);
    for (var i = 0; i < this._subscribers.length; i++) {
      this._subscribers[i].apply(this, args);
    }
  }
};
module.exports = PubSub;