var React = require('react');
var CartStore = require('../../stores/cart-store.js');
var CatalogItem = require('./catalog-item.js');
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
    mixins: [new StoreWatchMixin(getCatalog)],
    render: function() {

      var items;

      if (this.state.loading) {
        items = <tr><td>Loading...</td></tr>;
      } else {
        items = this.state.items.map(function(item, i) {
          return (<CatalogItem key={item.id} item={item} />);
        });
      }

      return (
          <div className="row">
          {items}
          </div>
        );
    }
  });

module.exports = Catalog;
