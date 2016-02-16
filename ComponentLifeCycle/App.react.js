var React = require('react');
var ReactDOM = require('react-dom');

var Button = React.createClass({
	getInitialState: function () {
		return ({
			sCount : 0
		});
	},

	componentWillMount: function () {
		console.log('Mouting');
		//console.log(this.refs);
	},

	componentDidMount: function () {
		console.log('Mounted');
		//console.log(this.refs);
		//this.timer = setInterval(this.update, 500);
	},

	componentWillUnmount: function () {
		console.log('Bye!');
		//clearInterval(this.timer);
	},

	update: function () {
		this.setState({sCount: this.state.sCount + 1 });
	},

	render: function () {
		console.log("Rendering");
		return (
			<button onClick={this.update}>{this.state.sCount}</button>
		);
	}

});

var App = React.createClass({
	mountButton: function (e) {
		ReactDOM.render(<Button/>, this.refs.a);
	},

	unmountButton: function (e) {
		ReactDOM.unmountComponentAtNode(this.refs.a);
	},

	render: function() {
		return(
			<div>
				<button onClick={this.mountButton}>Mount</button>
				<button onClick={this.unmountButton}>Unmount</button>
				<div ref="a"></div>
			</div>
		);
	}
});

module.exports = App;
