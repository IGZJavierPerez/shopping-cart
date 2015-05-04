var React = require('react');
var Router = require('react-router');
var Catalog = require('./catalog/catalog.js');
var Cart = require('./cart/cart.js');
var CatalogDetail = require('./product/detail.js');
var Template = require('./app-template.js');
var AppActions = require('../actions/app-actions');

var RouteHandler = Router.RouteHandler;

var APP =
  React.createClass({
    componentDidMount: function() {
      AppActions.loadCatalog();
    },
    render: function() {
      return (
        <Template>
          <RouteHandler/>
        </Template>

        );
    }
  });

module.exports = APP;
