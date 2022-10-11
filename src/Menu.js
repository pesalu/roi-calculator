import React from "react";
import { Togglable, StyledMenuItem } from "./StyledContainers";
import styled from "styled-components";

import { useEffect } from "react";
import { BarChartAlt2, LineChart } from "@styled-icons/boxicons-regular";
import { Link } from "react-router-dom";

let StyledMenu = styled.div`
  overflow: hidden;
  border-right: 1px solid #fff;
  transition: width 0.3s;

  // width: ${(props) => (props.minimized ? "6.4rem" : "100%")};
  width: ${(props) => (props.minimized ? "auto" : "100%")};
`;

let MenuItemList = styled.div`
  transition: all 0.3s;
`;

function Menu({ minimized }) {
  useEffect(() => {
    if (!minimized) {
      console.log("is minimized: ", minimized);
      document.getElementById("menu-button-text").style.display = "block";
      document.getElementById("menu-button-text-2").style.display = "block";
    }
  });

  return (
    <StyledMenu id="menu" minimized={minimized}>
      <MenuItemList minimized={minimized}>
        <Link to="/test2">
          <StyledMenuItem minimized={minimized}>
            <LineChart size="4.4rem" color="#fff" />
            <Togglable
              visible={!minimized}
              onTransitionEnd={(e) => {
                console.log("MIN", minimized);
                if (minimized) {
                  document.getElementById("menu-button-text").style.display =
                    "none";
                }
              }}
            >
              <h4 id="menu-button-text">ROI Calculator (2nd Layout)</h4>
            </Togglable>
          </StyledMenuItem>
        </Link>
        <Link to="/test">
          <StyledMenuItem minimized={minimized}>
            <BarChartAlt2 size="4.4rem" color="#fff" />
            <Togglable
              visible={!minimized}
              onTransitionEnd={(e) => {
                console.log("MIN", minimized);
                if (minimized) {
                  document.getElementById("menu-button-text-2").style.display =
                    "none";
                }
              }}
            >
              <h4 id="menu-button-text-2">ROI Calculator</h4>
            </Togglable>
          </StyledMenuItem>
        </Link>
      </MenuItemList>
    </StyledMenu>
  );
}

export default Menu;
