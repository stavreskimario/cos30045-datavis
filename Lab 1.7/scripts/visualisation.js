function init() {
  var w = 500;
  var h = 100;
  var dataset;

  var rowConverter = function(d) {

    return {
      Test: parseFloat(d.Test)
    };
  }

  d3.csv("data/random-data.csv", rowConverter, function(data) {
    if (data === null) {
      d3.select("#chart").append("p")
        .text("Data failed to load");
    }
    dataset = data;
    console.log(dataset);

    barChart(dataset);
  });

  function barChart() {
    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return i * (w / dataset.length);
      })
      .attr("y", function(d) {
        return h - d.Test;
      })
      .attr("width", w / dataset.length - 1)
      .attr("height", function(d) {
        return d.Test;
      });
  }
}

window.onload = init;
