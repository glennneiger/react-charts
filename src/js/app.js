var React = require('react');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Hello World from React</h1>
                <p>Thanks for coming</p>
            </div>
        );
    }
});

React.render(<App />, document.getElementById('app'));
