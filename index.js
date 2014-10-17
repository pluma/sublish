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
    callback.fn = fn;
    callback.ctx = ctx;
    this._subscribers.push(callback);
  },
  unsubscribe: function (fn, ctx) {
    'use strict';
    for (var i = 0; i < this._subscribers.length; i++) {
      if (this._subscribers[i].fn !== fn || this._subscribers[i].ctx !== ctx) continue;
      this._subscribers.splice(i, 1);
      return true;
    }
    return false;
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
