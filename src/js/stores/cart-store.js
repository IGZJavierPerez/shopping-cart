var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;

var CHANGE_EVENT = "change";


var _catalog = [];

var _loading = false;

var _cartItems = [];

function _loadCatalog(items) {
  items.forEach(function(item) {
    _catalog.push(item);
  });
}

function _removeItem(index) {
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index) {
  _cartItems[index].qty++;
}

function _decreaseItem(index) {
  if ( _cartItems[index].qty > 1 ) {
    _cartItems[index].qty--;
  } else {
    _removeItem(index);
  }
}


function _addItem(item) {
  if( !item.inCart ) {
    item.qty = 1;
    item.inCart = true;
    _cartItems.push(item);
  } else {
    _cartItems.forEach( function(cartItem, i) {
      if( cartItem.id === item.id ) {
        _increaseItem(i);
      }
    });
  }
}

function _cartTotals() {
  var qty = 0, total = 0;
  _cartItems.forEach(function(cartItem) {
    qty += cartItem.qty;
    total += cartItem.qty * cartItem.cost;
  });
  return {'qty': qty, 'total': total};
}


var CartStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCart: function() {
    return _cartItems;
  },

  getCatalog: function() {
    return _catalog;
  },

  getCartTotals: function() {
    return _cartTotals();
  },

  isLoading: function() {
    return _loading;
  }
});

CartStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {

    case ActionTypes.LOAD_CATALOG:
      _loading = true;
      break;

    case ActionTypes.LOAD_CATALOG_SUCCESS:
      _loading = false;
      _loadCatalog(action.items);
      break;

    case ActionTypes.ADD_ITEM:
      _addItem(action.item);
      break;

    case ActionTypes.REMOVE_ITEM:
      _removeItem(action.index);
      break;

    case ActionTypes.INCREASE_ITEM:
      _increaseItem(action.index);
      break;

    case ActionTypes.DECREASE_ITEM:
      _decreaseItem(action.index);
      break;
  }

  CartStore.emitChange();

  return true;
});

module.exports = CartStore;
