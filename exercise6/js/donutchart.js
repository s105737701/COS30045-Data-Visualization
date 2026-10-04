const DONUT_CSV_PATH = "data/Data_exercise 5.1-1.csv";
const DONUT_CATEGORY_COLUMN = "Screen_Tech";
const DONUT_VALUE_COLUMN = "Mean(Labelled energy consumption (kWh/year))";

const donutContainer = d3.select("#donut-chart");

if (!donutContainer.empty()) {
    const width = 760;
    const height = 420;
    const radius = 150;

    donutContainer.style("position", "relative");

    const svg = donutContainer
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("display", "block")
        .style("width", "100%")
        .style("height", "auto")
        .attr("role", "img")
        .attr(
            "aria-label",
            "Donut chart comparing mean labelled energy consumption by screen technology"
        );

    const chart = svg.append("g")
        .attr(
            "transform",
            `translate(270, ${height / 2})`
        );

    const tooltip = donutContainer
        .append("div")
        .style("position", "absolute")
        .style("display", "none")
        .style("padding", "8px 10px")
        .style("background", "#222")
        .style("color", "#fff")
        .style("border-radius", "5px")
        .style("font-size", "13px")
        .style("pointer-events", "none")
        .style("z-index", "10");

    d3.csv(DONUT_CSV_PATH, row => ({
        category: (row[DONUT_CATEGORY_COLUMN] || "").trim(),
        value: Number(
            String(row[DONUT_VALUE_COLUMN] || "").replace(/,/g, "")
        )
    }))
    .then(rows => {
        const data = rows.filter(d =>
            d.category !== "" &&
            Number.isFinite(d.value) &&
            d.value > 0
        );

        if (data.length === 0) {
            throw new Error(
                `No valid rows found. Check the CSV columns: ` +
                `${DONUT_CATEGORY_COLUMN} and ${DONUT_VALUE_COLUMN}.`
            );
        }

        const total = d3.sum(data, d => d.value);

        const colors = d3.scaleOrdinal()
            .domain(data.map(d => d.category))
            .range(["#f5b335", "#4d8b57", "#d96c4f"]);

        const pie = d3.pie()
            .sort(null)
            .value(d => d.value);

        const arc = d3.arc()
            .innerRadius(radius * 0.58)
            .outerRadius(radius);

        const hoverArc = d3.arc()
            .innerRadius(radius * 0.58)
            .outerRadius(radius + 8);

        chart.selectAll("path")
            .data(pie(data))
            .join("path")
            .attr("d", arc)
            .attr("fill", d => colors(d.data.category))
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            .on("mouseenter", function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(150)
                    .attr("d", hoverArc);

                const percentage =
                    (d.data.value / total * 100).toFixed(1);

                tooltip
                    .style("display", "block")
                    .text(
                        `${d.data.category.toUpperCase()}: ` +
                        `${d3.format(",.1f")(d.data.value)} kWh/year ` +
                        `(${percentage}% of shown averages)`
                    );
            })
            .on("mousemove", function(event) {
                const [x, y] = d3.pointer(
                    event,
                    donutContainer.node()
                );

                tooltip
                    .style("left", `${x + 12}px`)
                    .style("top", `${y + 12}px`);
            })
            .on("mouseleave", function() {
                d3.select(this)
                    .transition()
                    .duration(150)
                    .attr("d", arc);

                tooltip.style("display", "none");
            });

        chart.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.2em")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("MEAN");

        chart.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.3em")
            .style("font-size", "12px")
            .text("kWh / year");

        const legend = svg.append("g")
            .attr(
                "transform",
                `translate(${width - 220}, 160)`
            );

        const legendRows = legend.selectAll("g")
            .data(data)
            .join("g")
            .attr(
                "transform",
                (d, i) => `translate(0, ${i * 32})`
            );

        legendRows.append("rect")
            .attr("width", 14)
            .attr("height", 14)
            .attr("rx", 2)
            .attr("fill", d => colors(d.category));

        legendRows.append("text")
            .attr("x", 22)
            .attr("y", 12)
            .style("font-size", "13px")
            .text(d => {
                return `${d.category.toUpperCase()}  ${d3.format(",.1f")(d.value)} kWh/year`;
            });
    })
    .catch(error => {
        console.error("Donut chart error:", error);

        donutContainer.append("p")
            .attr("class", "chart-error")
            .text(
                "Could not display the donut chart. " +
                "Check the CSV path and column names in the console."
            );
    });
}