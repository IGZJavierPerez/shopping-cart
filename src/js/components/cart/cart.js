var React = require('react');
var CartStore = require('../../stores/cart-store.js');
var RemoveFromCart = require('./cart-removefromcart.js');
var Increase = require('./cart-increase.js');
var Decrease = require('./cart-decrease.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin.js');

var Router = require('react-router');
var Link = Router.Link;

function cartItems() {
  return {items: CartStore.getCart()};
}

var Cart =
  React.createClass({
    mixins: [new StoreWatchMixin(cartItems)],
    render: function() {
      var total = 0;
      var items = this.state.items.map(function(item, i) {
        var subtotal = item.cost * item.qty;
        total += subtotal;
        return (
          <tr key={i}>
            <td><RemoveFromCart index={i} /></td>
            <td>{item.title}</td>
            <td>{item.qty}</td>
            <td>
              <Increase index={i} />
              <Decrease index={i} />
            </td>
            <td>${subtotal}</td>
          </tr>
          );
      });
      return (
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Item</th>
                <th>Qty</th>
                <th></th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-right">Total</td>
                <td>${total}</td>
              </tr>
            </tfoot>
          </table>
          <Link to="/">
            Continue Shopping
            </Link>
        </div>
        );
    }
  });

module.exports = Cart;
