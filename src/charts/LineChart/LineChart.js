import { useD3 } from "../../hooks/useD3";
import React from "react";
import { useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

let Div = styled.div`
  background-color: #fff;
  padding: 0rem;
  border-radius: 9px;
  position: relative;
`;

let Svg = styled.svg`
  height: 500;
  width: 100%;
  margin-right: 0px;
  margin-left: 0px;
`;

const height = 500;
const width = 500;
function LineChart({ data }) {
  const [activeDataPointIndex, setActiveDataPointIndex] = useState(null);

  d3.select("#canvas").selectAll("g > *").remove();
  d3.select("#canvas").selectAll("circle").remove();
  d3.select("#canvas").selectAll(".tooltip").remove();

  const ref = useD3(
    (svg) => {
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3
        .scaleLinear()
        .domain([
          0.95 * d3.min(data, (d) => d.x),
          1.05 * d3.max(data, (d) => d.x),
        ])
        .rangeRound([margin.left, width - margin.right]);

      const y1 = d3
        .scaleLinear()
        .domain([
          0.95 * d3.min(data, (d) => d.y),
          1.05 * d3.max(data, (d) => d.y),
        ])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(${margin.left},0)`)
        .call(
          d3
            .axisLeft(y1)
            .tickSize(-(width - margin.left - margin.right))
            .tickFormat("")
        );

      svg
        .selectAll("g.tick")
        .select("line")
        .attr("stroke", "#E6E6E3")
        .style("stroke-dasharray", "5 5");

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      let tooltipDiv = d3
        .select("#canvas")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "steelblue")
        .style("padding", "0.5rem")
        .style("border-radius", "9px")
        .style("opacity", 0);

      let tooltipText = tooltipDiv.append("p");

      d3.select(".tooltip-area")
        .append("text")
        .attr("class", "tooltip-area-text");

      const mouseleave = (event, d) => {
        tooltipDiv.transition().duration(500).style("opacity", 0);
        d3.select(".active-datapoint")
          .transition()
          .duration(500)
          .style("opacity", 0);
      };

      const mousemove = (event, d) => {
        const bisect = d3.bisector((d) => d.x).left;
        let [x0, y0] = d3.pointer(event);
        let dataPointIndex = bisect(data, x.invert(x0), 1);

        let activeDataPoint = data[dataPointIndex - 1];

        // Show data point
        d3.select(".active-datapoint")
          .transition()
          .duration(30)
          .attr(
            "transform",
            `translate(${x(activeDataPoint.x)}, ${y1(activeDataPoint.y)})`
          )
          .transition()
          .duration(400)
          .style("opacity", 0.7);

        // Show tooltip
        tooltipDiv
          .transition()
          .duration(30)
          .style(
            "left",
            (100 * (x(activeDataPoint.x) + 2 * circleRadius)) / width + "%"
          )
          .style(
            "top",
            (100 * (y1(activeDataPoint.y) + 2 * circleRadius)) / height + "%"
          )
          .transition()
          .duration(10)
          .style("opacity", 0.9);

        tooltipText.html(`
          <strong>Year:</strong> ${activeDataPoint.x}
          <br>
          <strong>Value:</strong> ${Math.ceil(activeDataPoint.y)}
        `);
      };

      d3.select("svg")
        .append("g")
        .attr("class", "plot-area")
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.x);
            })
            .y(function (d) {
              return y1(d.y);
            })
        );

      svg.on("mousemove", mousemove).on("mouseleave", mouseleave);

      let circleRadius = 3;
      svg
        .selectAll(".circles")
        .data(data)
        .join("circle")
        .attr("r", circleRadius)
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y1(d.y));

      var activeDataPointElement = svg
        .append("g")
        .attr("class", "active-datapoint")
        .style("opacity", 0);

      activeDataPointElement.append("circle").attr("r", 10).attr("fill", "red");
    },
    [data]
  );

  return (
    <>
      <Div id="canvas">
        {/* <svg
        ref={ref}
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      > */}
        <Svg
          ref={ref}
          viewBox={`0 0 ${height} ${width}`}
          style={{
            // height: 500,
            // width: "100%",
            height: "100%",
            marginRight: "0px",
            marginLeft: "0px",
          }}
        >
          {/* <g className="plot-area" /> */}
          <g className="x-axis" />
          <g className="y-axis" />
        </Svg>
        {/* </svg> */}
      </Div>
    </>
  );
}

export default LineChart;
