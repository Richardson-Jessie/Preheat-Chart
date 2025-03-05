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
  const heatInputValueElement2 = document.getElementById("heatInputValue2");
  const groupLabel = document.getElementById("groupLabel").value;
  const group = data2.find(g => g.label === groupLabel);

  if (group) {
      const x = parseFloat(value);
      if (x < group.start.x || x > group.end.x) {
          // Hide the heat input line if the value is out of range
          d3.select("#heatInputLine").attr("visibility", "hidden");
          heatInputValueElement.textContent = `Heat Input: ${x}, Minimum Preheat Temperature, °C Out of range`;
          heatInputValueElement2.textContent = `Heat Input: ${x}, Minimum Preheat Temperature, °C Out of range`;
      } else {
          const y = group.start.y + (group.end.y - group.start.y) * (x - group.start.x) / (group.end.x - group.start.x);
          heatInputValueElement.textContent = `Heat Input: ${x}, Minimum Preheat Temperature, °C ${y}`;
          heatInputValueElement2.textContent = `Heat Input: ${x}, Minimum Preheat Temperature, °C ${y}`;

          console.log(`Heat Input: ${x}, Y value: ${y}`); // Debugging log

          // Update the position of the vertical line
          d3.select("#heatInputLine")
              .attr("x1", xScale2(x))
              .attr("x2", xScale2(x))
              .attr("y1", yScale2(y))
              .attr("y2", yScale2(0))
              .attr("visibility", "visible");
      }
  }
}

// Initial highlight
highlightLine();