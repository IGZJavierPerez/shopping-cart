var React = require('react');
var Router = require('react-router');
var APP = require('./components/app');
var Catalog = require('./components/catalog/catalog.js');
var Cart = require('./components/cart/cart.js');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;


var routes = (
  <Route handler={APP}>
    <DefaultRoute handler={Catalog}/>
    <Route name="cart" handler={Cart}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});