const drawHistogram = (data) => {
    // Set up dimensions and margins
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("display", "block")
        .style("width", "100%")
        .style("height", "auto");

    //create inner chart
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //get the bins using the bin generator
    const bins = binGenerator(data); // save bin into array
    console.log(bins); //log the bins to the console

    //set up min and max energy consumption values from the bins to set the x scale domain
    const minEng = bins[0].x0; //min energy consumption
    const maxEng = bins[bins.length - 1].x1; //max energy consumption

    // calculate the maximum length of the bins to set the y scale domain
    const maxBinLength = d3.max(bins, d => d.length);

    console.log("minEng:", minEng, "maxEng:", maxEng, "maxBinLength:", maxBinLength); //log the min and max energy consumption values and the maximum bin length

    //set the x and y scale domains
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);
    yScale
        .domain([0, maxBinLength])
        .range([innerHeight, 0])
        .nice(); //round the domain to nice round numbers

    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale));

    innerChart.append("g")
        .call(d3.axisLeft(yScale));

    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 5)
        .attr("text-anchor", "middle")
        .text("Energy consumption (kWh/year)");

    innerChart.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -margin.left + 20)
        .attr("text-anchor", "middle")
        .text("Number of TVs");
}