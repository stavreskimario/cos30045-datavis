function init() {
    var w = 500;
    var h = 400;

    var padding = 20;
    var hPadding = padding;
    var hRightPadding = hPadding;
    var hLeftPadding = hPadding;
    var wPadding = padding;
    var wLeftPadding = wPadding;
    var wRightPadding = wPadding + 50;
    var dataset = [
        [140, 50],
        [210, 23],
        [12, 90],
        [45, 32],
        [12, 9],
        [100, 5],
        [60, 60],
        [1200, 80]
    ];

    var xScale = d3.scaleLinear()
        .domain([d3.min(dataset, function(d) {
                return d[0];
            }),
            d3.max(dataset, function(d) {
                return d[0];
            })
        ])
        .range([wLeftPadding, w - wRightPadding]);

    var yScale = d3.scaleLinear()
        .domain([d3.min(dataset, function(d) {
                return d[1];
            }),
            d3.max(dataset, function(d) {
                return d[1];
            })
        ])
        .range([h - hLeftPadding, hRightPadding]);

    var xAxis = d3.axisBottom()
        .ticks(10)
        .scale(xScale);
    var yAxis = d3.axisLeft()
        .scale(yScale);



    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr("r", 5)
        .attr("fill", function(d, i) {
            if (i == 4) {
                return "red";
            }
            return "slategrey";
        });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return "(" + d[0] + ", " + d[1] + ")";
        })
        .attr("x", function(d, i) {
            return xScale(d[0]) + 5;
        })
        .attr("y", function(d) {
            return yScale(d[1]) + 10;
        })
        .attr("fill", "green");

    svg.append("g")
        .attr("transform", "translate (0, " + (h - padding) + ")")
        .attr("class", "axis")
        .call(xAxis);
    svg.append("g")
        .attr("transform", "translate (" + padding + ", 0)")
        .attr("class", "axis")
        .call(yAxis);


}

window.onload = init;