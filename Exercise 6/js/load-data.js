// load csv data with row conversion

d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.Brand,
    model: d.Model,
    screenSize: +d.screenSize, //convert to number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, //convert to number
    star: +d.star //convert to number
})).then(data => {
    //log 
    console.log(data);

    //call functions
    drawHistogram(data);
    populateFilters(data);

}).catch(error => {
    console.error("Error loading CSV data:", error);
});
