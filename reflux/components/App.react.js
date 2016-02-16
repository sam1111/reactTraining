var React = require('react');
var Reflux = require('reflux');

var UserStore = require('./../stores/UserStore');
var UserApi = require('./../apis/UserApi.js');

var App = React.createClass({
    mixins: [Reflux.ListenerMixin],
    
    getInitialState: function() {
        return({
           sUsers: [] 
        });      
    },
    
    componentDidMount: function() {
        this.listenTo(UserStore, this._usersAvailable);
        
        UserApi.getUsers();
    },
    
    _usersAvailable: function(args) {
        this.setState({sUsers: args});
    },

    createUsersList: function(user) {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.place}</td>
            </tr>
        );
    },

    render: function() {
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Place</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sUsers.map(this.createUsersList)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = App;
