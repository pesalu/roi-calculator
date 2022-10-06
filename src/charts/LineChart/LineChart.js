import React from "react";
import { useEffect } from "react";
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
  d3.select("#canvas").selectAll("g > *").remove();
  d3.select("#canvas").selectAll("circle").remove();
  d3.select("#canvas").selectAll(".tooltip").remove();

  let renderFn = getRenderFn(data);
  useEffect(renderFn, [data]);

  return (
    <>
      <Div id="canvas">
        <Svg
          viewBox={`0 0 ${height} ${width}`}
          style={{
            height: "100%",
            marginRight: "0px",
            marginLeft: "0px",
          }}
        >
          <g className="grid" />
          <g className="plot-area" />
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="circles" />
          <g className="active-datapoint" />
        </Svg>
      </Div>
    </>
  );
}

export default LineChart;

function getRenderFn(data) {
  return () => {
    let svg = d3.select("svg");
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const circleRadius = 3;

    // Get functions for mapping calculated coordinates to
    // to render coordinates
    const getX = getXinPlotArea(data, margin);
    const getY = getYinPlotArea(data, margin);

    // Create axis
    const xAxis = getXAxis(margin, getX);
    const yAxis = getYAxis(margin, getY, data);
    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(yAxis);

    // Create background grid
    drawGrid(svg, margin, getY);

    // Create tooltip
    let tooltipDiv = getTooltip();
    let tooltipText = tooltipDiv.append("p").attr("class", ".tooltip-text");

    // Get mouse movement handlers
    const mouseleave = getMouseLeaveHandler(tooltipDiv, svg);
    const mousemove = getMouseMoveHandler(
      svg,
      data,
      tooltipDiv,
      getX,
      getY,
      circleRadius,
      tooltipText
    );
    svg.on("mousemove", mousemove).on("mouseleave", mouseleave);

    drawLine(svg, data, getX, getY);

    drawDataPoints(svg, data, circleRadius, getX, getY);

    drawActiveDataPoint(svg, circleRadius);
  };
}

function drawActiveDataPoint(svg, circleRadius) {
  svg
    .select(".active-datapoint")
    .style("opacity", 0)
    .append("circle")
    .attr("r", 3.0 * circleRadius)
    .attr("fill", "red");
}

function drawDataPoints(svg, data, circleRadius, getX, getY) {
  svg
    .select(".circles")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", circleRadius)
    .attr("cx", (d) => getX(d.x))
    .attr("cy", (d) => getY(d.y));
}

function drawLine(svg, data, getX, getY) {
  svg
    .select(".plot-area")
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
          return getX(d.x);
        })
        .y(function (d) {
          return getY(d.y);
        })
    );
}

function getMouseLeaveHandler(tooltip, svg) {
  return (event, d) => {
    tooltip.transition().duration(500).style("opacity", 0);
    svg
      .select(".active-datapoint")
      .transition()
      .duration(500)
      .style("opacity", 0);
  };
}

function getMouseMoveHandler(
  svg,
  data,
  tooltip,
  getX,
  getY,
  circleRadius,
  tooltipText
) {
  return (event, d) => {
    const bisect = d3.bisector((d) => d.x).left;
    let [x0, y0] = d3.pointer(event);
    let dataPointIndex = bisect(data, getX.invert(x0), 1);
    let activeDataPoint = data[dataPointIndex - 1];

    // Show data point
    svg
      .select(".active-datapoint")
      .transition()
      .duration(30)
      .attr(
        "transform",
        `translate(${getX(activeDataPoint.x)}, ${getY(activeDataPoint.y)})`
      )
      .transition()
      .duration(400)
      .style("opacity", 0.7);

    // Show tooltip
    tooltip
      .transition()
      .duration(30)
      .style(
        "left",
        (100 * (getX(activeDataPoint.x) + 2 * circleRadius)) / width + "%"
      )
      .style(
        "top",
        (100 * (getY(activeDataPoint.y) + 2 * circleRadius)) / height + "%"
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
}

function getTooltip() {
  return d3
    .select("#canvas")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "steelblue")
    .style("padding", "0.5rem")
    .style("border-radius", "9px")
    .style("opacity", 0);
}

function drawGrid(svg, margin, getY) {
  svg
    .select(".grid")
    .attr("transform", `translate(${margin.left},0)`)
    .call(
      d3
        .axisLeft(getY)
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat("")
    );

  svg
    .selectAll(".grid .tick")
    .select("line")
    .attr("stroke", "#E6E6E3")
    .style("stroke-dasharray", "5 5");
}

function getYAxis(margin, getY, data) {
  return (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .style("color", "steelblue")
      .call(d3.axisLeft(getY).ticks(null, "s"))
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
}

function getXAxis(margin, getX) {
  return (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(getX)
        .tickValues(
          d3
            .ticks(...d3.extent(getX.domain()), width / 40)
            .filter((v) => getX(v) !== undefined)
        )
        .tickSizeOuter(0)
    );
}

function getYinPlotArea(data, margin) {
  return d3
    .scaleLinear()
    .domain([0.95 * d3.min(data, (d) => d.y), 1.05 * d3.max(data, (d) => d.y)])
    .rangeRound([height - margin.bottom, margin.top]);
}

function getXinPlotArea(data, margin) {
  return d3
    .scaleLinear()
    .domain([0.95 * d3.min(data, (d) => d.x), 1.05 * d3.max(data, (d) => d.x)])
    .rangeRound([margin.left, width - margin.right]);
}
