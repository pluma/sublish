# Synopsis

**sublish** is a minimalist lightweight (504 Bytes minified and 297 Bytes gzipped) implementation of publish/subscribe.

[![stability 3 - stable](http://b.repl.ca/v1/stability-3_--_stable-yellowgreen.png)
](http://nodejs.org/api/documentation.html#documentation_stability_index) [![license - Unlicense](http://b.repl.ca/v1/license-Unlicense-lightgrey.png)](http://unlicense.org/) [![Flattr this](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=pluma&url=https://github.com/pluma/sublish)

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
make && make dist
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
var myPubSub = new sublish.PubSub();

myPubSub.subscribe(function(message) {
  console.log('myPubSub says: "' + message + '"');
});

// elsewhere
myPubSub.publish('something amazing');
// -> 'myPubSub says: "something amazing"'
```

# Mixin usage example with [mixed](https://github.com/pluma/mixed)

```javascript
function Person(name) {
    this.name = name;
}
Person.prototype = {
    say: function(message) {
        this.publish(this.name + ' says: "' + message + '"');
    }
};

var joe = new Person('Joe');
mixed.mixin(sublish.PubSub, joe);

joe.subscribe(function(message) {
    console.log(message);
});

// elsewhere
joe.say('Hello there!');
// -> 'Joe says: "Hello there!"
```

# API

## new PubSub()

Creates a new PubSub instance.

**NOTE:** This is a constructor. Use of the `new` keyword is therefore not optional.

## PubSub#subscribe(callback:Function)

Adds the given callback function to this object's list of subscribers.

**NOTE**: The callback will be called with the PubSub instance as its context. If you want to preserve the callback's original context, use `Function#bind` or (in legacy browsers) wrap the callback in a closure.

## PubSub#unsubscribe(callback:Function)

Removes the given callback function from this object's list of subscribers.

## PubSub#publish(args…)

Publishes the given arguments as a message. Every callback function in this object's list of subscribers will be called sequentially with the given messages as its arguments.

# Unlicense

This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying [UNLICENSE](https://github.com/pluma/sublish/blob/master/UNLICENSE) file.