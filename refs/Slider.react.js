var React = require('react');

var Slider = React.createClass ({
	getInitialState: function () {
		return({
			sSliderValue: 128
		});
	},

	onChange: function(e) {
		this.setState({sSliderValue: e.target.value});
	},

	render: function () {
		return(
			<div>
				<input ref="slider" type="range" min="0" max="255" onChange={this.onChange}/>
				{this.state.sSliderValue}
			</div>
		);
	}
});

module.exports = Slider;
