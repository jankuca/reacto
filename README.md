# reacto

Disclaimer: This is not a React replacement. It is merely a 30-line extension which works wonders. You still need to have React installed.

“React**o**” stands for “**object-oriented** React” in the classical sense native to JavaScript – leveraging constructors and prototypes.

It is surely not very clear how the object model works in React at the first glance. You have a static factory `React.createClass()` which returns another factory. One would expect that React simply added this method to avoid general public from having to perform the usual inheritance steps. It is understandable and if just that were happening, it would be great, but React takes it a step further by returning a factory instead of the actual constructor (or a “class” as the method name suggests).

Reacto brings back the intuitive approach of working with constructors and prototypes cherished by Google Closure Library and partially also even by node.js for instance.

## Component Definition

In plain React, a component “specification” is passed to the `React.createClass()` factory method and the method returns a factory for the newly defined component. A call to the factory creates an internal `ReactElement` which can then be mounted onto the DOM via `React.render(component, domNode)`.

```javascript
var AuthView = react.createClass({
  render: function () {
    return react.DOM.span(null, 'User: ' + this.props.username);
  }
});

var authView = AuthView({ username: 'Jan' });
react.render(authView, domNode);
```

Reacto provides a notation known to and understood by everyone.

```javascript
var AuthView = function (props) {
  reacto.Component.call(this, props);
};
inherits(AuthView, reacto.Component);

AuthView.prototype.render = function () {
  return react.DOM.span(null, 'User: ' + this.props.username);
};

var authView = new AuthView({ username: 'Jan' });
react.render(authView, domNode);
```

## Benefits

It may not be clear to some why this approach is advantegeous and how it benefits them.

- **dependency injection made effortless**
- **no global services**
- **clear object model**
- **clear code**
- **ES6 class** and **CoffeeScript class** syntax support

### Dependency Injection

Dependency injection is a huge problem in the Flux/React world as pretty much the only way how to perform constructor injection is by passing services and actions to a component via `props`. This is ugly and hardly automatable. Almost every example of using React or Flux is built around globally accessible services which is a pain the butt of testability and just makes the code unclear and the object model is basically a random mess.

Reacto, by bringing back constructors of components, makes DI a breeze; you simply pass services to the constructor and the instance does not need to access the global scope to get data and trigger actions.

```javascript
var AuthView = function (authStore, authActions, props) {
  reacto.Component.call(this, props);

  this._authStore = authStore;
  this._authActions = authActions;
};
inherits(AuthView, reacto.Component);

AuthView.prototype.componentDidMount = function () {
  this._auth.listen(this._handleChange.bind(this));
};

AuthView.prototype._handleChange = function () {
  this.setState({
    username: this._auth.getUser().username
  });
};

AuthView.prototype.render = function () {
  if (!this.state.username) {
    react.DOM.div(null, [
      react.DOM.span(null, 'Not signed in'),
      react.DOM.button({ onClick: this._authActions.authenticate }, 'Sign in!')
    ]);
  }

  return react.DOM.span(null, 'Username: ' + this.state.username);
};
```

### `class` syntax

ES6 and CoffeeScript `class` syntax support.

```javascript
class AuthView extends reacto.Component {
  constructor(authStore, props) {
    super(props);
    this._authStore = authStore;
  }
}
```

```coffeescript
class AuthView extends reacto.Component
  constructor: (authStore, props) ->
    super(props)
    @_authStore = authStore
```

## Installation

```
npm install reacto
```
