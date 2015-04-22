var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
  	LOAD_CATALOG: null,
  	LOAD_CATALOG_SUCCESS: null,
    ADD_ITEM: null,
    REMOVE_ITEM: null,
    INCREASE_ITEM: null,
    DECREASE_ITEM: null
  })

};