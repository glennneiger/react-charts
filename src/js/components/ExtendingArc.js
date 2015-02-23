var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({

    render: function() {
        return (
            <div
                className='extending-arc'
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

        this._dimensions = {
            width: el.offsetWidth,
            height: 500
        };
        
        var outerRadius = this._dimensions.height / 2 - 20;
        var innerRadius = outerRadius / 3;

        this._radius= {
            outerRadius: outerRadius,
            innerRadius: innerRadius,
            cornerRadius: 10
        };


        this._pie = d3.layout.pie()
            .padAngle(0.02)
            .value(function(d) { return d.val; });

        this._arc = d3.svg.arc()
            .padRadius(this._radius.outerRadius)
            .innerRadius(this._radius.innerRadius);

        this._svg = d3.select(el).append("svg")
            .attr("width", this._dimensions.width)
            .attr("height", this._dimensions.height)
          .append("g")
            .attr("transform", "translate(" + this._dimensions.width / 2 + "," + this._dimensions.height / 2 + ")");
        this.updateChart(el, data);
    },

    updateChart: function(el, data) {
        var _this = this;
        this._svg.selectAll("path")
            .data(this._pie(data))
            .enter().append("path")
            .each(function(d) { d.outerRadius = _this._radius.outerRadius - 20; })
            .attr("d", this._arc)
            .on("mouseover", this.arcTween(_this._radius.outerRadius, 0))
            .on("mouseout", this.arcTween(_this._radius.outerRadius - 20, 150));
    },
    arcTween: function(outerRadius, delay) {

        var _this = this;
        return function() {
            
            d3.select(this).transition().delay(delay).attrTween("d", function(d) {

                var i = d3.interpolate(d.outerRadius, outerRadius);
                return function(t) { d.outerRadius = i(t); return _this._arc(d); };
            });
        };
    }
    
});