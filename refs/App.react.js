var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('./Slider.react');

var App = React.createClass({
	componentDidMount: function () {
		console.log(ReactDOM.findDOMNode(this.refs.red.refs.slider).value);
		ReactDOM.findDOMNode(this.refs.red.refs.slider).value = 255;
	},

	render: function () {
		return(
			<div>
				<Slider ref="red"/>
				<Slider ref="green"/>
				<Slider ref="blue"/>
			</div>
		);
	}
});

module.exports = App;
