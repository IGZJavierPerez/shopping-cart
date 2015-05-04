var React = require('react');
var AddToCart = require('../catalog/catalog-addtocart.js');
var Router = require('react-router');
var Link = Router.Link;
var CartStore = require('../../stores/cart-store.js');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin.js');

function getCatalogItem(component){
  //see: https://github.com/rackt/react-router/issues/975
  var itemId = component.context.router.getCurrentParams().itemId;
  var thisItem;
  CartStore.getCatalog().forEach(function(item) {
  	if(item.id.toString() === itemId) {
      thisItem = item;
    }
  });
  
  return {item: thisItem};
}

var CatalogDetail =
  React.createClass({
  	mixins: [StoreWatchMixin(getCatalogItem)],
  
  	//see: https://github.com/rackt/react-router/issues/975
    contextTypes: {
      router: React.PropTypes.func.isRequired,
    },
    render: function() {
      return (
          <div>
            <h2>{this.state.item.title}</h2>
            <img src={this.state.item.img} alt="" />
            <p>{this.state.item.description}</p>
            <p>${this.state.item.cost} <span className="text-success">{this.state.item.inCart && '(' + this.state.item.qty + ' in cart)'}</span></p>
            <div className="btn-group btn-group-sm">
              <AddToCart item={this.state.item} />
              <Link to='/' className="btn btn-default">Continue Shopping</Link>
            </div>
          </div>
        )
    }
  });

module.exports = CatalogDetail;
