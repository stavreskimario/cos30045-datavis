function init() {

    var w = 500;
    var h = 100;
    var data = true;
    var data1 = [14, 5, 26, 23, 9, 90, 45, 32, 12, 4];
    var data2 = [12, 5, 3, 16, 6, 1, 2, 6];
    var currdata = data1;

    d3.select("#update")
        .on("click", function() {
            data = !data;
            if (data) {
                currdata = data1;
            } else {
                currdata = data2;
            }

            svg.selectAll("rect")
                .data(currdata)
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return h - d;
                })
        });
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(currdata)])
        .range([0, h]);

    var xScale = d3.scaleBand()
        .domain(d3.range(currdata.length))
        .rangeRound([0, w])
        .paddingInner(0.05);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(currdata)
        .enter()
        .append("rect");

    svg.selectAll("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - d;
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", "red");
}

window.onload = init;