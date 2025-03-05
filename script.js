const svg1 = d3.select("#chart1"),
      width1 = +svg1.attr("width"),
      height1 = +svg1.attr("height"),
      margin1 = {top: 40, right: 50, bottom: 50, left: 50};

const xScale1 = d3.scaleLinear().domain([0, 125]).range([margin1.left, width1 - margin1.right]);
const yScale1 = d3.scaleLinear().domain([2, 12]).range([height1 - margin1.bottom, margin1.top]);

const xAxis1 = d3.axisBottom(xScale1)
    .ticks(5) // Major ticks at each 25 units (125 / 5 = 25)
    .tickSize(-height1 + margin1.top + margin1.bottom);

const xAxisMinor1 = d3.axisBottom(xScale1)
    .tickValues(d3.range(0, 126, 2.5)) // Minor ticks at each 2.5 units
    .tickSize(-height1 + margin1.top + margin1.bottom)
    .tickFormat(''); // Hide labels for minor ticks

const yAxis1 = d3.axisLeft(yScale1)
    .ticks(10)
    .tickSize(-width1 + margin1.left + margin1.right);

svg1.append("g")
    .attr("transform", `translate(0,${height1 - margin1.bottom})`)
    .call(xAxis1);

svg1.append("g")
    .attr("transform", `translate(0,${height1 - margin1.bottom})`)
    .call(xAxisMinor1);

svg1.append("g").attr("transform", `translate(${margin1.left},0)`).call(yAxis1);

// Add X-axis label
svg1.append("text")
    .attr("x", width1 / 2)
    .attr("y", height1 - margin1.bottom / 4)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("COMBINED THICKNESS = (t₁ + t₂ + t₃ + t₄), mm");

// Add Y-axis label
svg1.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", margin1.left / 2)
    .attr("x", -height1 / 2)
    .attr("dy", "-1em")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text("Group Number");

const groups = [
    {label: 'A', start: {x: 3, y: 12}, end: {x: 43, y: 3}},
    {label: 'B', start: {x: 4, y: 12}, end: {x: 51, y: 3.5}},
    {label: 'C', start: {x: 5, y: 12}, end: {x: 60, y: 4}},
    {label: 'D', start: {x: 8, y: 12}, end: {x: 70, y: 4.5}},
    {label: 'E', start: {x: 10, y: 12}, end: {x: 82, y: 5}},
    {label: 'F', start: {x: 14, y: 12}, end: {x: 92, y: 5.5}},
    {label: 'G', start: {x: 18, y: 12}, end: {x: 110, y: 6}},
    {label: 'H', start: {x: 24, y: 12}, end: {x: 110, y: 7}},
    {label: 'I', start: {x: 34, y: 12}, end: {x: 110, y: 8}},
    {label: 'J', start: {x: 48, y: 12}, end: {x: 110, y: 9}},
    {label: 'K', start: {x: 63, y: 12}, end: {x: 110, y: 10}},
    {label: 'L', start: {x: 88, y: 12}, end: {x: 110, y: 11}}
];

const lineGenerator1 = d3.line()
    .x(d => xScale1(d.x))
    .y(d => yScale1(d.y))
    .curve(d3.curveCatmullRom.alpha(0.1)); // Lower alpha value for smoother curves

const paths1 = [];
const horizontalLines1 = [];

groups.forEach(group => {
    const points = d3.range(10).map(i => ({
        x: group.start.x + (group.end.x - group.start.x) * (i / 9),
        y: group.start.y + (group.end.y - group.start.y) * Math.sin((i / 9) * Math.PI / 2)
    }));

    const path = svg1.append("path")
        .datum(points)
        .attr("d", lineGenerator1)
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    paths1.push(path);

    // Add flat horizontal line at the end
    const horizontalLine = svg1.append("line")
        .attr("x1", xScale1(group.end.x))
        .attr("y1", yScale1(group.end.y))
        .attr("x2", xScale1(125))
        .attr("y2", yScale1(group.end.y))
        .attr("stroke", "blue")
        .attr("stroke-width", 2);

    horizontalLines1.push(horizontalLine);

    // Calculate midpoint of the path data points
    const midIndex = Math.floor(points.length / 2);
    const midPoint = points[midIndex];

    // Add label at the midpoint
    svg1.append("text")
        .attr("x", xScale1(midPoint.x))
        .attr("y", yScale1(midPoint.y))
        .attr("dy", "-0.5em")
        .attr("text-anchor", "middle")
        .attr("fill", "blue")
        .text(group.label);
});

// Second chart setup
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
    .curve(d3.curveCatmullRom.alpha(0.1)); // Lower alpha value for smoother curves

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
        .attr("stroke", "blue") // Changed to blue
        .attr("stroke-width", 2)
        .attr("fill", "none");

    paths2.push(path);

    // Add flat horizontal line at the end
    const horizontalLine = svg2.append("line")
        .attr("x1", xScale2(group.end.x))
        .attr("y1", yScale2(group.end.y))
        .attr("x2", xScale2(6))
        .attr("y2", yScale2(group.end.y))
        .attr("stroke", "blue") // Changed to blue
        .attr("stroke-width", 2);

    horizontalLines2.push(horizontalLine);

    // Calculate midpoint of the path data points
    const midIndex = Math.floor(points.length / 2);
    const midPoint = points[midIndex];

    // Add label at the midpoint
    svg2.append("text")
        .attr("x", xScale2(midPoint.x))
        .attr("y", yScale2(midPoint.y))
        .attr("dy", "-0.5em")
        .attr("text-anchor", "middle")
        .attr("fill", "blue") // Changed to blue
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

function highlightLine() {
    const groupLabel = document.getElementById("groupLabel").value;

    let closestIndex1 = 0;
    let closestIndex2 = 0;
    groups.forEach((group, index) => {
        if (group.label === groupLabel) {
            closestIndex1 = index;
        }
    });

    data2.forEach((group, index) => {
        if (group.label === groupLabel) {
            closestIndex2 = index;
        }
    });

    // Remove highlight class from all paths and lines in chart1
    paths1.forEach(path => {
        path.classed("highlight", false);
    });

    horizontalLines1.forEach(line => {
        line.classed("highlight", false);
    });

    // Add highlight class to the selected path and line in chart1
    paths1.forEach((path, index) => {
        path.classed("highlight", index === closestIndex1);
    });

    horizontalLines1.forEach((line, index) => {
        line.classed("highlight", index === closestIndex1);
    });

    if (groupLabel !== "A") {
        // Remove highlight class from all paths and lines in chart2
        paths2.forEach(path => {
            path.classed("highlight", false);
        });

        horizontalLines2.forEach(line => {
            line.classed("highlight", false);
        });

        // Add highlight class to the selected path and line in chart2
        paths2.forEach((path, index) => {
            path.classed("highlight", index === closestIndex2);
        });

        horizontalLines2.forEach((line, index) => {
            line.classed("highlight", index === closestIndex2);
        });
    }

    // Update the Y value when changing the groupLabel parameter
    updateHeatInput(document.getElementById('heatInput').value);
}

function updateHeatInput(value) {
    const heatInputValueElement = document.getElementById("heatInputValue");
    const groupLabel = document.getElementById("groupLabel").value;
    const group = data2.find(g => g.label === groupLabel);

    if (group) {
        const x = parseFloat(value);
        const y = group.start.y + (group.end.y - group.start.y) * (x - group.start.x) / (group.end.x - group.start.x);
        heatInputValueElement.textContent = `Heat Input: ${x}, Y value: ${y}`;

        console.log(`Heat Input: ${x}, Y value: ${y}`); // Debugging log

        // Update the position of the vertical line
        d3.select("#heatInputLine")
            .attr("x1", xScale2(x))
            .attr("x2", xScale2(x))
            .attr("y1", yScale2(y))
            .attr("y2", yScale2(0));
    }
}

// Initial highlight
highlightLine();