const populateFilters = (data) => {



}

d3.select("#filters_screen")
    .selectAll("button")
    .data(filter_screen[0])
    .join("button")
    .attr("class", d => d.isActive ? "active" : "")
    .text(d => d.label)

    .on("click", (e, d) => {
        console.log ("clicked filter:", e);
        console.log ("clicked filter:", d);
    });