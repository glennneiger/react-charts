var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({
    propTypes: {
        data: React.PropTypes.array
    },
    render: function() {
        return (
            <div 
                className = 'pie-chart' 
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
            width: (el.offsetWidth - this._padding * 2),
            height: (el.offsetWidth - this._padding * 2) / 2,
            radius: (el.offsetWidth - this._padding * 2) / 4
        }; 

        
            
        this._chart = d3.select(el)
            .append('svg')
            .attr('width', this._dimensions.width)
            .attr("height", this._dimensions.height)
            .append("g")
    .attr("transform", "translate(" + this._dimensions.width / 2 + "," + this._dimensions.height / 2 + ")");

        if (data.length > 0) {
            this.updateChart(el, data);
        }

        

    },

    updateChart: function(el, data) {
        
        this._scales = {
            arc: d3.svg.arc()
                .outerRadius( this._dimensions.radius)
                .innerRadius(0),

            pie: d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.val; })
        };

        this._color = d3.scale.linear()
            .domain([0, 5])
            .range(['#3F51B5', '#9FA8DA']);

        var _this = this;

        var g = this._chart.selectAll(".arc")
              .data(this._scales.pie(data))
            .enter().append("g")
              .attr("class", "arc")
              .attr("fill", function(d, i ) {
                return _this._color(i);
                });

          g.append("path")
              .attr("d", this._scales.arc);

          g.append("text")
              .attr("transform", function(d) { console.log(d); return "translate(" + _this._scales.arc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.value; });

    }
});