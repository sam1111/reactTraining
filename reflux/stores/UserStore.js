'use strict';

var Reflux = require('reflux');

var userActions = require('./../actions/UserActions');

var UserStore = Reflux.createStore({

    init: function() {
        this.listenTo(userActions.usersAvailable, this._usersAvailable);
    },

    _usersAvailable: function(params) {
        this.trigger(params);       
    }
});

module.exports = UserStore;
