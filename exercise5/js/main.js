const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 500 500")
    .style("border", "1px solid black");

d3.csv("data/4.4exportdata.csv", d => {

  return {
    brand: d.brand,
    count: +d.count
  };

}).then(data => {
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));
  data.sort((a, b) => b.count - a.count);
  drawBarChart(data);

});

const drawBarChart = data => {
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 500]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    barAndLabel
    .append("rect")
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 100)
        .attr("y",0);

    barAndLabel
    .append("text")
        .text(d => d.brand)
        .attr("x", 90)
        .attr("y", 15)
        .attr("text-anchor", "end")
        .style("font-size", "13px");
    barAndLabel

    .append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 4)
        .attr("y", 12)
        .style("font-size", "13px");

};
