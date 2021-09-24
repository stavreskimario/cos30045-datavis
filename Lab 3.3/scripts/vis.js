function init() {
    'use strict';
    var w = 500;
    var h = 100;
    var data = true;
    var data1 = [14, 5, 26, 23, 9, 90, 45, 32, 12, 4];
    var data2 = [12, 5, 3, 16, 6, 1, 2, 6];
    var dataset = data1;

    var maxValue = 25;
    d3.select("#add")
        .on("click", function() {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber);


            var bars = svg.selectAll("rect").data(dataset);
            xScale.domain(d3.range(dataset.length));

            bars.enter()
                .append("rect")
                .attr("x", w)
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .merge(bars)
                .transition()
                .delay(500)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })

            .attr("fill", "red");
        });

    d3.select("#remove")
        .on("click", function() {
            dataset.shift();
            var bars = svg.selectAll("rect").data(dataset);
            xScale.domain(d3.range(dataset.length - 1));
            bars.exit()
                .transition()
                .duration(500)
                .attr("x", w)
                .remove()

            bars.transition()
                .delay(500)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - yScale(d);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
        });

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, h]);

    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.05);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect");

    svg.selectAll("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", "red");
}

window.onload = init;