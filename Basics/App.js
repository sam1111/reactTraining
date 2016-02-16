var React = require('react');

var App = React.createClass({

	propTypes: {
		fText: React.PropTypes.string,
		fNumber: React.PropTypes.number.isRequired
	},

	getInitialState: function() {
		return(
			{
				sText: 'This is the state text'
			}
		);
	},

	getDefaultProps: function() {
		return (
			{
				fText: 'This is the default Text!',
				fNumber: 0
			}
		);
	},

	update: function (e) {
		this.setState({sText: e.target.value});
	},

	render: function() {
		return (
			<div>
				<input type="text" onChange={this.update} />
				<h1>{this.state.sText}</h1>
			</div>
		);
		//return React.createElement('h1', null, 'Hello Guys');
	}
});

module.exports = App;