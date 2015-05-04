var React = require('react');
var CartStore = require('../../stores/cart-store.js');
var AddToCart = require('./catalog-addtocart.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin.js');

function getCatalog() {
  return {
    items: CartStore.getCatalog(),
    loading: CartStore.isLoading()
  };
}

function isLoading() {
  return {loading: CartStore.isLoading()};
}


var Catalog =
  React.createClass({
    mixins:[StoreWatchMixin(getCatalog)],
    render:function(){

      var items;

      if (this.state.loading) {
        items = <tr><td>Loading...</td></tr>;
      } else {
        items = this.state.items.map(function(item, i) {
          return <tr key={i}><td>{item.title}</td><td>{item.cost}</td><td><AddToCart item={item}/></td></tr>
        });
      }

      return (
          <table className="table table-hover">
          <tbody>
          {items}
          </tbody>
          </table>
        )
    }
  });
module.exports = Catalog;