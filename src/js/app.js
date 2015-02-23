var React = require('react');
var BarChart = require('./components/BarChart');
var reqwest = require('reqwest');
var _ = require('lodash');
var PieChart = require('./components/PieChart');
var ExtendingArc = require('./components/ExtendingArc');

var numDataPoints = 8;

var App = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentWillMount: function() {
        reqwest({
            url: 'http://www.filltext.com/?callback=JSON_CALLBACK&rows=' + numDataPoints + '&val={numberRange|10, 100}',
            type: 'jsonp',
            success: function(resp) {
                resp = _.without(resp, resp[numDataPoints]);
                this.setState({data: resp});
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div>
                <header className='app-header '>
                <h2>Simple React D3 chart components</h2>
                
                </header>
                <div className="container">
                    <p className='lead'>These are mostly just an excuse to learn some more react and make some components</p>
                    <div className='chart-item'>
                        <h2>Bar Chart Component</h2>
                        <BarChart data={this.state.data} barWidth = {40}/>
                    </div>
                    <div className='chart-item'>
                        <h2>Pie Chart Component</h2>
                        <PieChart data={this.state.data} />
                    </div>
                    <div className='chart-item'>
                        <h2>ExtendingArc Component</h2>
                        <ExtendingArc data={this.state.data} />
                    </div>

                </div>
                
            </div>
        );
    }
});


React.render(<App />, document.getElementById('app'));
