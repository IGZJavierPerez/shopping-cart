/*
 *
 * A singleton that operates as the central hub for application updates.
 */

var AppDispatcher = require('flux').Dispatcher;

module.exports = new AppDispatcher();
