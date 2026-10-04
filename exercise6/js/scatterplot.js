const drawScatterplot = (data) => {

	// Set the dimensions and margins of the chart area
	const svg = d3.select("#scatterplot")
		.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`); // Responsive SVG

	// Create an inner chart group with margins
	innerChartS = svg
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	const maxStar = d3.max(data, d => d.star);
	const maxEnergyConsumption = d3.max(data, d => d.energyConsumption);

	xScaleS
		.domain([0, maxStar])
		.range([0, innerWidth]);
	yScaleS
		.domain([0, maxEnergyConsumption])
		.range([innerHeight, 0]);

	colorScale
		.domain(data.map(d => d.screenTech))
		.range(d3.schemeCategory10);

	innerChartS.selectAll("circle")
		.data(data)
		.join("circle")
		.attr("r", 3)
		.attr("cx", d => xScaleS(d.star))
		.attr("cy", d => yScaleS(d.energyConsumption))
		.attr("fill", d => colorScale(d.screenTech))
		.attr("opacity", 0.5);

	innerChartS.append("g")
		.attr("transform", `translate(0, ${innerHeight})`)
		.call(d3.axisBottom(xScaleS));

	innerChartS.append("g")
		.call(d3.axisLeft(yScaleS));

	innerChartS.append("text")
		.attr("class", "axis-label")
		.attr("x", innerWidth / 2)
		.attr("y", innerHeight + margin.bottom - 5)
		.attr("text-anchor", "middle")
		.text("Star Rating");

	innerChartS.append("text")
		.attr("class", "axis-label")
		.attr("transform", "rotate(-90)")
		.attr("x", -innerHeight / 2)
		.attr("y", -margin.left + 20)
		.attr("text-anchor", "middle")
		.text("Energy Consumption (kWh/year)");

	const legend = svg.append("g")
		.attr("transform", `translate(${width - 100}, ${margin.top})`);

	colorScale.domain().forEach((screenTech, i) => {
		const legendRow = legend.append("g")
			.attr("transform", `translate(0, ${i * 20})`);

		legendRow.append("rect")
			.attr("width", 10)
			.attr("height", 10)
			.attr("fill", colorScale(screenTech));

		legendRow.append("text")
			.attr("x", 20)
			.attr("y", 10)
			.attr("text-anchor", "start")
			.style("alignment-baseline", "middle")
			.text(screenTech);
	});

}
