var mockUsersData=[
  {
      id: 1,
      name: 'Suresh Raina',
      place: 'India'
  },
  {
      id: 2,
      name: 'Virat Kohli',
      place: 'India'
  },
  {
      id: 3,
      name: 'Glen Maxwell',
      place: 'Australia'
  }
];


var UserActions = require('./../actions/UserActions');

var UsersApi = {
    _nowGetData: function() {
        clearInterval(this.interval);
        UserActions.usersAvailable(mockUsersData);
    },

    getUsers: function(){
        this.iterval = setInterval(this._nowGetData, 10000);
    }
}



module.exports = UsersApi;
