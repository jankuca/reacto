var react = require('react');
var reactCurrentOwner = require('react/lib/ReactCurrentOwner');
var reactContext = require('react/lib/ReactContext');


/**
 * @constructor
 * @extends {react.CompositeComponent}
 */
var Component = function (config) {
  if (!(this instanceof Component)) {
    throw new Error('Component constructor cannot be used without new');
  }

  this.ref = null;
  this.key = null;

  var props = {};
  if (config) {
    this.ref = (typeof config.ref !== 'undefined') ? config.ref : null;
    this.key = (config.key !== null) ? config.key : null;

    var hasOwnProperty = {}.hasOwnProperty;
    for (var propKey in config) {
      // Ignore ref and key in a Closure Compiler-safe manner.
      if (hasOwnProperty.call(config, propKey) &&
          !hasOwnProperty.call(this, propKey)) {
        props[propKey] = config[propKey];
      }
    }
  }

  this._owner = reactCurrentOwner.current;
  this._context = reactContext.current;

  this.type = this.constructor;
  this.props = props;
};


// Inherit from react.Element
var baseSpec = { render: function () {} };
var BaseComponent = react.createClass(baseSpec).type;
Component.prototype = BaseComponent.prototype;


module.exports = Component;
