var React = require('react');

var List = React.createClass({

    propTypes: {
        fItems: React.PropTypes.array.isRequired
    },

    getDefaultProps: function () {
        return ({
            fItems: []
        });
    },

    getInitialState: function () {
        return ({
            sItems: []
        });
    },

    componentWillReceiveProps: function (newProps) {
        if (newProps.fItems) {
            this.setState({ sItems: newProps.fItems });
        }
    },

    createList: function (item) {
        return (
            <div key={ item } > { item } < /div>  
        );
    },

render: function() {
    return (
        <div>
        { this.state.sItems.map(this.createList) }
        < /div>
        );
}
});

var App = React.createClass({

    propTypes: {
        fInitialItems: React.PropTypes.array,
        fPlaceHolderText: React.PropTypes.string
    },

    getDefaultProps: function () {
        return ({
            fInitialItems: [
                "Apples",
                "Broccoli",
                "Chicken",
                "Duck",
                "Eggs",
                "Fish",
                "Granola",
                "Hash Browns"
            ],
            fPlaceHolderText: 'Search'
        })
    },

    getInitialState: function () {
        return ({
            sItems: []
        });
    },

    componentDidMount: function () {
        this.setState({ sItems: this.props.fInitialItems });
    },

    filter: function (e) {
        var filteredList = this.props.fInitialItems;
        filteredList = filteredList.filter(function (item) {
            return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        });
        this.setState({ sItems: filteredList });
    },

    render: function () {
        return (
            <div>
            <input type="text" onChange= { this.filter } placeholder= { this.props.fPlaceHolderText } />
            <List fItems={ this.state.sItems } />
            < /div>
        );
    }
});

module.exports = App;
