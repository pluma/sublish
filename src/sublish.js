function PubSub() {
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
        for (var i = 0; i < this._subscribers.length; i++) {
            this._subscribers[i].apply(this, args);
        }
    }
};
exports.PubSub = PubSub; 
