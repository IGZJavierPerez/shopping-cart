var React = require('react');
var CartStore = require('../stores/cart-store.js');

var StoreWatchMixin = function(cb){
  return {
    getInitialState:function(){
      return cb(this);
    },
    componentWillMount:function(){
      CartStore.addChangeListener(this._onChange);
    },
    componentWillUnmount:function(){
      CartStore.removeChangeListener(this._onChange);
    },
    _onChange:function(){
      this.setState(cb(this));
    }
  };
};

module.exports = StoreWatchMixin;
