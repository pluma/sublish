/*! sublish 0.3.0 Copyright (c) 2013 Alan Plum. MIT licensed. */
(function(root){var require=function(key){return root[key];},exports=(root.sublish={});
function PubSub(obj) {
    this._subscribers = [];
}
PubSub.prototype = {
    subscribe: function(callback) {
        this._subscribers.push(callback);
    },
    unsubscribe: function(callback) {
        var i = this._subscribers.indexOf(callback);
        if (~i) {
            this._subscribers.splice(i, 1);
        }
        return !!~i;
    },
    publish: function() {
        var args = Array.prototype.slice.call(arguments, 0);
        this._subscribers.forEach(function(fn) {
            fn.apply(this, args);
        }.bind(this));
    }
};
exports.PubSub = PubSub; 
}(this));
