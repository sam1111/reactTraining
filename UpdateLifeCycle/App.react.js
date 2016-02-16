var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	propTypes:{
		fCount: React.PropTypes.number.isRequired
	},

	getDefaultProps: function() {
		return ({
			fCount: 0
		});
	},

	getInitialState: function() {
		return({
			sIncreasing: false
		});
	},

	componentWillReceiveProps: function(newProps) {
		//console.log(newProps);
		this.setState({sIncreasing: newProps.fCount > this.props.fCount ? true: false});
	},

	shouldComponentUpdate: function(nextProps, nextState){
		//console.log(nextProps);
		//console.log(nextState);
		return nextProps.fCount % 5 === 0;
	},

	componentDidUpdate: function(prevProps, prevState){
		console.log(prevProps);
		console.log(prevState);
	},

	update: function(e) {
		e.preventDefault();
		ReactDOM.render(<App fCount={this.props.fCount+1}></App>, document.getElementById('app'));
	},

	render: function() {
		//console.log('rendering');
		//console.log(this.state.sIncreasing);
		return(
			<div>
				<button onClick={this.update}>{this.props.fCount}</button>
			</div>
		);
	}
});

module.exports = App;
