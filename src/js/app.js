var React = require('react');

var Test = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Hello World from React</h1>
                <p>Thanks for coming</p>
            </div>
        );
    }
});

React.render(<Test />, document.getElementById('app'));
