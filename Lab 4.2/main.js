//defining width and height
var w = 300;
var h = 300;

// defining dataset
var dataset = [20, 90, 50, 33, 95, 12, 44];

var outerRadius = w / 2;
var innerRadius = 0;

var arc = d3.arc().outerRadius(outerRadius).innerRadius(innerRadius);

var pie = d3.pie();

// define padding
var padding = 20;

//create svg element
var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var arcs = svg
    .selectAll("g.arc")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

arcs
    .append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", function(d, i) {
        return arc(d, i);
    });

arcs
    .append("text")
    .text(function(d) {
        return d.value;
    })
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    });