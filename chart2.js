const svg2 = d3.select("#chart2"),
      width2 = +svg2.attr("width"),
      height2 = +svg2.attr("height"),
      margin2 = {top: 40, right: 50, bottom: 50, left: 50};

const xScale2 = d3.scaleLinear().domain([0, 6]).range([margin2.left, width2 - margin2.right]);
const yScale2 = d3.scaleLinear().domain([0, 250]).range([height2 - margin2.bottom, margin2.top]);

const xAxis2 = d3.axisBottom(xScale2)
    .ticks(6) // Major ticks at each 1 unit (6 / 6 = 1)
    .tickSize(-height2 + margin2.top + margin2.bottom);

const xAxisMinor2 = d3.axisBottom(xScale2)
    .tickValues(d3.range(0, 7, 0.5)) // Minor ticks at each 0.5 units
    .tickSize(-height2 + margin2.top + margin2.bottom)
    .tickFormat(''); // Hide labels for minor ticks

const yAxis2 = d3.axisLeft(yScale2)
    .ticks(10)
    .tickSize(-width2 + margin2.left + margin2.right);

svg2.append("g")
    .attr("transform", `translate(0,${height2 - margin2.bottom})`)
    .call(xAxis2);

svg2.append("g")
    .attr("transform", `translate(0,${height2 - margin2.bottom})`)
    .call(xAxisMinor2);

svg2.append("g").attr("transform", `translate(${margin2.left},0)`).call(yAxis2);

// Add X-axis label
svg2.append("text")
    .attr("x", width2 / 2)
    .attr("y", height2 - margin2.bottom / 4)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("Heat Input (Q), kj/mm");

// Add Y-axis label
svg2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", margin2.left / 2)
    .attr("x", -height2 / 2)
    .attr("dy", "-1em")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("Minimum Preheat Temperature, °C");

const data2 = [
    { label: 'B', start: { x: 1.0, y: 25 }, end: { x: 1.2, y: 0 } },
    { label: 'C', start: { x: 1.2, y: 50 }, end: { x: 1.6, y: 0 } },
    { label: 'D', start: { x: 1.3, y: 75 }, end: { x: 2.2, y: 0 } },
    { label: 'E', start: { x: 1.5, y: 100 }, end: { x: 3.1, y: 0 } },
    { label: 'F', start: { x: 1.6, y: 125 }, end: { x: 4.2, y: 0 } },
    { label: 'G', start: { x: 1.8, y: 150 }, end: { x: 5.6, y: 0 } },
    { label: 'H', start: { x: 1.9, y: 175 }, end: { x: 6, y: 35 } },
    { label: 'I', start: { x: 1.9, y: 200 }, end: { x: 6, y: 80 } },
    { label: 'J', start: { x: 1.6, y: 225 }, end: { x: 6, y: 120 } },
    { label: 'K', start: { x: 1.2, y: 250 }, end: { x: 6, y: 155 } },
    { label: 'L', start: { x: 1.5, y: 250 }, end: { x: 6, y: 185 } }   
];

const lineGenerator2 = d3.line()
    .x(d => xScale2(d.x))
    .y(d => yScale2(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5)); // Ensure curves are rendered

const paths2 = [];
const horizontalLines2 = [];

data2.forEach(group => {
    const points = d3.range(10).map(i => ({
        x: group.start.x + (group.end.x - group.start.x) * (i / 9),
        y: group.start.y + (group.end.y - group.start.y) * (i / 9)
    }));

    const path = svg2.append("path")
        .datum(points)
        .attr("d", lineGenerator2)
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    paths2.push(path);

    // // Add flat horizontal line at the end
    // const horizontalLine = svg2.append("line")
    //     .attr("x1", xScale2(group.end.x))
    //     .attr("y1", yScale2(group.end.y))
    //     .attr("x2", xScale2(6))
    //     .attr("y2", yScale2(group.end.y))
    //     .attr("stroke", "blue")
    //     .attr("stroke-width", 2);

    // horizontalLines2.push(horizontalLine);

    // Calculate midpoint of the path data points
    const midIndex = Math.floor(points.length / 2);
    const midPoint = points[midIndex];

    // Add label at the midpoint
    svg2.append("text")
        .attr("x", xScale2(midPoint.x))
        .attr("y", yScale2(midPoint.y))
        .attr("dy", "-0.5em")
        .attr("text-anchor", "middle")
        .attr("fill", "blue")
        .text(group.label);
});

// Add vertical line for heat input
const heatInputLine = svg2.append("line")
    .attr("x1", xScale2(0))
    .attr("y1", yScale2(0))
    .attr("x2", xScale2(0))
    .attr("y2", yScale2(0))
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("id", "heatInputLine");