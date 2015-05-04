var React = require('react');
var Router = require('react-router');
var CartStore = require('../../stores/cart-store.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin.js');

var Link = Router.Link;

function CartTotals(){
  return CartStore.getCartTotals();
}

var CartSummary =
  React.createClass({
    mixins: [new StoreWatchMixin(CartTotals)],
    render: function() {
      return (
        <div>
          <Link
            to="cart"
            className="btn btn-success">
            Cart Items: {this.state.qty} / ${this.state.total}
            </Link>
        </div>

        );
    }
  });

module.exports = CartSummary;
