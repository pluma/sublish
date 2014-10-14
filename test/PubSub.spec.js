/*jshint node: true */
/*global describe, it, beforeEach */
var expect = require('expect.js');
var PubSub = require('../');

describe('PubSub', function() {
  it('remembers listeners', function() {
    var listener = function() {};
    var pubsub = new PubSub();
    pubsub.listen(listener);
    expect(pubsub._listeners.length).to.equal(1);
  });
  it('notifies listeners when a message is published', function() {
    var pubsub = new PubSub();
    var messages = [];
    var listener = function(msg) {
      messages.push(msg);
    };
    var message = 'hello world';
    pubsub.listen(listener);
    pubsub.emit(message);
    expect(messages).to.only.contain(message);
  });
  it('passes all published arguments to listeners', function() {
    var pubsub = new PubSub();
    var messages = [];
    var listener = function() {
      messages.push(Array.prototype.slice.call(arguments, 0));
    };
    var message = ['hello', 'world'];
    pubsub.listen(listener);
    pubsub.emit.apply(pubsub, message);
    expect(messages.length).to.equal(1);
    expect(messages[0]).to.eql(message);
  });
  it('notifies each listener in sequence', function() {
    var pubsub = new PubSub();
    var results = [];
    pubsub.listen(function() {
      results.push('one');
    });
    pubsub.listen(function() {
      results.push('two');
    });
    pubsub.listen(function() {
      results.push('three');
    });
    pubsub.emit('message');
    expect(results).to.eql(['one', 'two', 'three']);
  });
  it('emits each message in sequence', function() {
    var pubsub = new PubSub();
    var messages = [];
    var listener = function(msg) {
      messages.push(msg);
    };
    pubsub.listen(listener);
    pubsub.emit('one');
    pubsub.emit('two');
    pubsub.emit('three');
    expect(messages).to.eql(['one', 'two', 'three']);
  });
  describe('when notified without listeners', function() {
    it('does not throw an error', function() {
      var pubsub = new PubSub();
      pubsub.emit('hello');
    });
  });
  describe('when a subscribed function is unsubscribed', function() {
    var pubsub, result, callback1, callback2;
    var listener1 = function() {
      listener1.timesCalled += 1;
    };
    var listener2 = function() {
      listener2.timesCalled += 1;
    };
    beforeEach(function() {
      pubsub = new PubSub();
      listener1.timesCalled = 0;
      listener2.timesCalled = 0;
      var unsubscribe = pubsub.listen(listener1);
      callback1 = pubsub._listeners[pubsub._listeners.length - 1];
      pubsub.listen(listener2);
      callback2 = pubsub._listeners[pubsub._listeners.length - 1];
      result = unsubscribe();
    });
    it('returns true', function() {
      expect(result).to.equal(true);
    });
    it('does not unsubscribe other functions', function() {
      expect(pubsub._listeners).to.only.contain(callback2);
    });
    it('does not notify unsubscribed functions', function() {
      pubsub.emit('message');
      expect(listener1.timesCalled).to.equal(0);
    });
    it('does notify other subscribed functions', function() {
      pubsub.emit('message');
      expect(listener2.timesCalled).to.equal(1);
    });
  });
  describe('when an unsubscribed function is unsubscribed again', function() {
    it('returns false', function() {
      var pubsub = new PubSub();
      var listener = function() {};
      var nonListener = function() {};
      var result;
      pubsub.listen(listener);
      var callback = pubsub._listeners[pubsub._listeners.length - 1];
      var unsubscribe = pubsub.listen(nonListener);
      unsubscribe();
      result = unsubscribe();
      expect(result).to.equal(false);
      expect(pubsub._listeners).to.only.contain(callback);
    });
  });
});
