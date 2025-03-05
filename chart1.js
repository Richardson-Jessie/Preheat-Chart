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