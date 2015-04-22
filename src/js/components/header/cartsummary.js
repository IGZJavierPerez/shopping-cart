var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var CartSummary =
  React.createClass({
    render:function(){
      return (
        <div>
          <Link
            to="cart"
            className="btn btn-success">
            Cart Items: QTY / $COST
            </Link>
        </div>

        )
    }
  });

module.exports = CartSummary;