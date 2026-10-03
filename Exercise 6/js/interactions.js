const populateFilters = (data) => {
    const updateHistogram = (filterId, data) => {
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);
        const updatedBins = binGenerator(updatedData);
        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
    };

    d3.select("#filters_screen")
        .selectAll("button")
        .data(filter_screen[0])
        .join("button")
        .attr("class", d => d.isActive ? "filter active" : "filter")
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);

            if (d.isActive) return;

            filter_screen[0].forEach(filter => {
                filter.isActive = filter.id === d.id;
            });

            d3.select("#filters_screen")
                .selectAll(".filter")
                .classed("active", filter => filter.isActive);

            updateHistogram(d.id, data);
        });
};