var React = require('react');

var Button = React.createClass({
	render: function() {
		return (
			<button>
				{this.props.children}
			</button>
		);
	}
});

var App = React.createClass({
	render: function () {
		return (
			<Button>
				<div>
					<p>Hello</p>
					<b>Bold</b>
				</div>
			</Button>
		);
	}
});

module.exports = App;