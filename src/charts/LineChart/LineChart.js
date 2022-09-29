import { useD3 } from "../../hooks/useD3";
import React from "react";
import * as d3 from "d3";
import styled from "styled-components";

let Div = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 9px;
`;

function LineChart({ data }) {
  console.log("DATA! ", data);
  d3.select("#canvas").selectAll("g > *").remove();
  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 500;
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

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      var tooltip = d3.select(".tooltip-area").style("opacity", 0);

      const mouseover = (event, d) => {
        tooltip.style("opacity", 1);
      };

      const mouseleave = (event, d) => {
        // tooltip.style('opacity', 0);
      };

      const mousemove = (event, d) => {
        const text = d3.select(".tooltip-area__text");
        text.text(`Sales were ${d.y} in ${d.x}`);
        const [x, y] = d3.pointer(event);

        tooltip.attr("transform", `translate(${x}, ${y})`);
      };

      svg
        .select(".plot-area")
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
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
        )
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("mouseover", mouseover);
    },
    [data]
  );

  return (
    <Div id="canvas">
      <svg
        ref={ref}
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="tooltip-area">
          <text className="tooltip-area__text">aas</text>
        </g>
      </svg>
    </Div>
  );
}

export default LineChart;
