import React from "react";
import { TitleContainer2, Togglable } from "./StyledContainers";
import styled from "styled-components";

import { useState } from "react";
import { LeftArrow } from "@styled-icons/boxicons-regular";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

let StyledMenu = styled.div`
  padding: 1rem;
  overflow: hidden;
  border-right: 1px solid #fff;
  transition: all 0.3s;

  // transform: ${(props) =>
    props.minimized ? "translateX(0%)" : "translateX(-80%)"};
  width: ${(props) => (props.minimized ? "5rem" : "100%")};
`;

let StyledMenuItem = styled.div`
  display: flex;
  align-items: center;

  color: #fff;
  padding: 0.5rem 0rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  border-bottom: 1px solid #eee;
  transition: all 0.3s;

  &:hover {
    background-color: #605e5c;
  }
`;

let MenuItemList = styled.div`
  transition: all 0.3s;
  // opacity: ${(props) => (props.minimized ? 0 : 1)};
  // transform: ${(props) =>
    props.minimized ? "translateX(-100%)" : "translateX(0%)"};
`;

let CustomLeftArrow = styled.div`
  font-size: 1.4rem;
`;

function Menu() {
  let [visible, setVisibility] = useState(true);
  let [minimized, setMinimize] = useState(false);
  let toggleVisibility = () => {
    setVisibility(!visible);
  };

  let minimizeSideBar = () => {
    setMinimize(!minimized);
    console.log("HERE", minimized);
  };

  return (
    <StyledMenu minimized={minimized}>
      <MenuItemList minimized={minimized}>
        <StyledMenuItem
          onClick={() => {
            minimizeSideBar();
          }}
        >
          <Togglable
            visible={!minimized}
            style={{ display: minimized ? "none" : "block" }}
          >
            MENU
          </Togglable>
          <div style={{ display: minimized ? "block" : "none" }}>X</div>{" "}
        </StyledMenuItem>
        <Link to="/test">
          <StyledMenuItem>
            <Togglable
              visible={!minimized}
              style={{ display: minimized ? "none" : "block" }}
            >
              ROI Calculator
            </Togglable>
            <div style={{ display: minimized ? "block" : "none" }}>X</div>{" "}
          </StyledMenuItem>
        </Link>
        <Link to="/test2">
          <StyledMenuItem>
            <Togglable
              visible={!minimized}
              style={{ display: minimized ? "none" : "block" }}
            >
              ROI Calculator 2
            </Togglable>
            <div style={{ display: minimized ? "block" : "none" }}>X</div>{" "}
            {/* <StyledMenuItem>Finance </StyledMenuItem> */}
          </StyledMenuItem>
        </Link>
      </MenuItemList>
    </StyledMenu>
  );
}

export default Menu;
