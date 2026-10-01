//set up dimensions and margins
const margin = {top: 40, right: 30, bottom: 50, left: 70};
const width = 800 - margin.left - margin.right;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

//global colors
const barColor = "#606464"
const bodyBackgroundColor = "#fffaf0"

//scaling
const xScale = d3.scaleLinear()
const yScale = d3.scaleLinear()

//create bin generator using d3.bin()
const binGenerator = d3.bin()
    .value(d => d.energyConsumption) //accessor function