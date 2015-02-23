var React = require('react');
var d3 = require('d3');

module.exports = React.createClass( {
    propTypes: {
        data: React.PropTypes.array
    },
    render: function() {
        return (
            <div 
                className = 'bar-chart' 
            />
        );
    },
    componentDidMount: function() {
        var el = this.getDOMNode();
        this.createChart(el, this.props.data);
    },
    componentDidUpdate: function() {
      
        this.updateChart(this.getDOMNode, this.props.data);
    },
    createChart: function(el, data) {




        this._padding = 20;

        this._dimensions = {
            width: el.offsetWidth - this._padding * 2,
            barHeight: this.props.barWidth
        }; 

        
            
        this._chart = d3.select(el)
            .append('svg')
            .attr('width', this._dimensions.width)
            .attr("height", this._dimensions.barHeight * data.length);

        if (data.length > 0) {
            this.updateChart(el, data);
        }

        

    },

    updateChart: function(el, data) {
        console.log('update');
        console.log(data);

        this._chart.attr("height", this._dimensions.barHeight * data.length);

        this._scales = {
            x: d3.scale.linear()
                .domain([0, d3.max(data, function(item) {
                    return item.val;
                    })])
                .range([0, this._dimensions.width])
        };
        var _this = this;

        var bar = this._chart.selectAll('g')
            .data(data)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * _this._dimensions.barHeight + ")"; });

        bar.append("rect")
            .attr("width", function(d) { 
                return _this._scales.x(d.val);
            })
            .attr("height", this._dimensions.barHeight - 1);

        bar.append("text")
            .attr("x", function(d) { return _this._scales.x(d.val) - 20; })
            .attr("y", this._dimensions.barHeight / 2)
            .attr("dy", ".35em")
            .attr('fill', 'white')
            .text(function(d) { return d.val; });

    }
});