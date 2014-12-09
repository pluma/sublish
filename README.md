# Synopsis

**sublish** is a minimalist lightweight (663 Bytes minified and 336 Bytes gzipped) implementation of publish/subscribe.

[![license - MIT](http://b.repl.ca/v1/license-MIT-blue.png)](http://pluma.mit-license.org) [![Flattr this](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=pluma&url=https://github.com/pluma/sublish)

[![browser support](https://ci.testling.com/pluma/sublish.png)](https://ci.testling.com/pluma/sublish)

[![Build Status](https://travis-ci.org/pluma/sublish.png?branch=master)](https://travis-ci.org/pluma/sublish) [![Coverage Status](https://coveralls.io/repos/pluma/sublish/badge.png?branch=master)](https://coveralls.io/r/pluma/sublish?branch=master) [![Dependencies](https://david-dm.org/pluma/sublish.png?theme=shields.io)](https://david-dm.org/pluma/sublish)

[![NPM status](https://nodei.co/npm/sublish.png?compact=true)](https://npmjs.org/package/sublish)

# Install

## Node.js

### With NPM

```sh
npm install sublish
```

### From source

```sh
git clone https://github.com/pluma/sublish.git
cd sublish
npm install
npm run test && npm run dist
```

## Browser

### With component

```sh
component install pluma/sublish
```

[Learn more about component](https://github.com/component/component).

### With bower

```sh
bower install sublish
```

[Learn more about bower](https://github.com/twitter/bower).

### With a CommonJS module loader

Download the [latest minified CommonJS release](https://raw.github.com/pluma/sublish/master/dist/sublish.min.js) and add it to your project.

[Learn more about CommonJS modules](http://wiki.commonjs.org/wiki/Modules/1.1).

### With an AMD module loader

Download the [latest minified AMD release](https://raw.github.com/pluma/sublish/master/dist/sublish.amd.min.js) and add it to your project.

[Learn more about AMD modules](http://requirejs.org/docs/whyamd.html).

### As a standalone library

Download the [latest minified standalone release](https://raw.github.com/pluma/sublish/master/dist/sublish.globals.min.js) and add it to your project.

```html
<script src="/your/js/path/sublish.globals.min.js"></script>
```

This makes the `sublish` module available in the global namespace.

# Basic usage example

```javascript
var myPubSub = require('sublish')();

var listener = function(message) {
  console.log('myPubSub says: "' + message + '"');
});

myPubSub.subscribe(listener);
myPubSub.publish('something amazing');
// -> 'myPubSub says: "something amazing"'

myPubSub.unsubscribe(listener);
myPubSub.publish('talking to myself');
// -> nothing happens
```

# Extending by inheritance

```js
var PubSub = require('sublish').PubSub;
var inherits = require('util').inherits;
function MyFancyPubSub() {
  PubSub.call(this);
}
inherits(MyFancyPubSub, PubSub);
```

# Extending as a mixin

```js
var PubSub = require('sublish').PubSub;
var extend = require('extend');
function MyFancyPubSub() {
  PubSub.call(this);
}
extend(MyFancyPubSub.prototype, PubSub.prototype);
```

# API

## new PubSub()

Creates a new PubSub instance.

## pubsub.subscribe(fn:Function, ctx:*):Function

Adds the given function to the instance's subscribers.

**Note:** the function will be invoked with its `this` context set to the given `ctx`. If `ctx` is false-y, the PubSub instance will be used instead.

## pubsub.unsubscribe(fn:Function, ctx:*):Boolean

Removes the given function from the instance's subscribers.

Returns `true` if the subscriber exists, `false` otherwise.

## pubsub.publish(args…)

Publishes the given arguments as a message. Every callback function in this object's list of subscribers will be called sequentially with the given messages as its arguments.

# License

The MIT/Expat license. For more information, see http://pluma.mit-license.org/ or the accompanying [LICENSE](https://github.com/pluma/sublish/blob/master/LICENSE) file.
