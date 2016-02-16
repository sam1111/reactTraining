var React = require('react');
var ToDoList = require('./ToDoList.react');

var ToDoApp = React.createClass ({
	propTypes: {
		fHeaderText: React.PropTypes.string
	},

	getDefaultProps: function () {
		return ({
			fHeaderText: ''
		});
	},

	getInitialState: function () {
		return ({
			sItems: [],
			sText: ''
		});
	},

	handleSubmit: function (e) {
		e.preventDefault();
		this.setState({
			sItems: this.state.sItems.concat({text: this.state.sText, id: Date.now()}),
			sText:''
		});
	},

	update: function (e) {
		this.setState({sText: e.target.value});
	},

	render: function () {
		return (
			<div>
			<h1>{this.props.fHeaderText}</h1>
			<ToDoList fItems={this.state.sItems}></ToDoList>
			<form onSubmit={this.handleSubmit}>
				<input type="text" value={this.state.sText} onChange={this.update} />
				<button>{'Add #' + (this.state.sItems.length + 1)}</button>
			</form>
			</div>
		);
	}
});

module.exports = ToDoApp;
