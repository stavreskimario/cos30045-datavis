function init() {
    var dataset = [];
    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number,
        };
    }).then(function(data) {
        dataset = data;
        if (!dataset) {
            alert("Database is undefined.");
        } else {
            lineChart(dataset);
        }
    });
}

function lineChart(dataset) {

    //defining variables
    var w = 600;
    var h = 300;
    var padding = 20;

    xScale = d3
        .scaleTime()
        .domain([
            d3.min(dataset, function(d) {
                return d.date;
            }),
            d3.max(dataset, function(d) {
                return d.date;
            }),
        ])
        .range([padding + 60, w - padding]);

    yScale = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(dataset, function(d) {
                return d.number;
            }),
        ])
        .range([h - padding, padding]);

    area = d3
        .area()
        .x(function(d) {
            return xScale(d.date);
        })
        .y0(function() {
            return yScale.range()[0];
        })
        .y1(function(d) {
            return yScale(d.number);
        });

    //create svg element
    var svg = d3.select("#chart").append("svg").attr("width", w).attr("height", h);

    svg.append("path").datum(dataset).attr("class", "line").attr("d", area);

    var xAxis = d3.axisBottom().ticks(10).scale(xScale);

    var yAxis = d3.axisLeft().ticks(10).scale(yScale);

    svg
        .append("g")
        .attr("transform", "translate(0, " + (h - padding) + ")")
        .call(xAxis);

    svg
        .append("g")
        .attr("transform", "translate(" + (padding + 60) + ", 0)")
        .call(yAxis);

    svg
        .append("line")
        .attr("class", "line halfMilMark")
        .attr("x1", padding + 60)
        .attr("y1", yScale(500000))
        .attr("x2", w - padding)
        .attr("y2", yScale(500000));

    svg
        .append("text")
        .attr("class", "halfMilLabel")
        .attr("x", padding + 70)
        .attr("y", yScale(500000) - 7)
        .text("Half a million unemployed");
}

window.onload = init;