var React = require('react');
var Catalog = require('../components/catalog/catalog');
var Cart = require('../components/cart/cart');
var AppActions = require('../actions/app-actions');


var APP =
  React.createClass({
    componentDidMount: function() {
      AppActions.loadCatalog();
    },
  	render: function() {
      return (
      	<div>
      	<h1>Let's Shop</h1>
      	<Catalog />
      	<h1>Cart</h1>
      	<Cart />
      	</div>
      )
    }
  });

module.exports = APP;