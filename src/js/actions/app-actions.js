var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var ActionTypes = AppConstants.ActionTypes;

var AppActions = {
  loadCatalog: function() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_CATALOG
    });

    //Fake async load
    setTimeout(function() {
      AppDispatcher.dispatch({
        actionType: ActionTypes.LOAD_CATALOG_SUCCESS,
        items: [1, 2, 3, 4, 5, 6, 7, 8].map(function(number){
          return {
            'id': 'Widget' + number,
            'title': 'Widget #' + number,
            'summary': 'This is an awesome widget!',
            'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, commodi.',
            'img': '/assets/product.png',
            'cost': number
          };
        })
      });
    }, 3000);

  },
  addItem: function(item){
    AppDispatcher.dispatch({
      actionType: ActionTypes.ADD_ITEM,
      item: item
    });
  },
  removeItem: function(index){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REMOVE_ITEM,
      index: index
    });
  },
  decreaseItem: function(index){
    AppDispatcher.dispatch({
      actionType: ActionTypes.DECREASE_ITEM,
      index: index
    });
  },
  increaseItem: function(index){
    AppDispatcher.dispatch({
      actionType: ActionTypes.INCREASE_ITEM,
      index: index
    });
  }
};

module.exports = AppActions;
