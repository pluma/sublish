# Synopsis

Minimalist Publish/Subscribe.

# Install

## Node.js

```sh
npm install sublish
```

## Browser (with component)

```sh
component install sublish
```

## Browser (with bower)

```sh
bower install sublish
```

## Browser (standalone)

Download the [latest minified release](https://github.com/pluma/sublish/lib/sublish.min.js) and add it to your project.

You can load the `sublish` module with your favourite CommonJS or AMD module loader or include the `sublish` global directly with a script tag:

```html
<script src="/your/js/path/sublish.min.js"></script>
```

If you are using an AMD loader but want to include the `sublish` global, make sure to place the script tag before the AMD loader.

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

# Mixin usage example

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
PubSub(joe);

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

## PubSub(obj)

Applies `PubSub` to the given obj as a mixin.

## PubSub#subscribe(callback:Function)

Adds the given callback function to this object's list of subscribers.

**NOTE:** The callback will be called with the PubSub instance as its context. If you want to preserve the callback's original context, use `Function#bind` or (in legacy browsers) wrap the callback in a closure.

## PubSub#unsubscribe(callback:Function)

Removes the given callback function from this object's list of subscribers.

## PubSub#publish(args…)

Publishes the given arguments as a message. Every callback function in this object's list of subscribers will be called sequentially with the given messages as its arguments.

# License

The MIT/Expat license.
