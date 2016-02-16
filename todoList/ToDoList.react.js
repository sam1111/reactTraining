var React = require('react');

var ToDoList = React.createClass({
	propTypes: {
		fItems: React.PropTypes.array.isRequired
	},

	getDefaultProps: function () {
		return ({
			fItems: []
		});
	},

	createList: function (item) {
		return (
			<li key={item.id}>{item.text}</li>
		);
	},

	render: function () {
		return (
			<ul>
				{this.props.fItems.map(this.createList)}
			</ul>
		);
	}
});

module.exports = ToDoList;
