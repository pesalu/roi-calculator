import React from "react";
import { Togglable, StyledMenuItem } from "./StyledContainers";
import styled from "styled-components";

import { useEffect } from "react";
import {
  BarChartAlt2,
  Home,
  LineChart,
  MenuAltLeft,
  X,
} from "@styled-icons/boxicons-regular";
import { Link } from "react-router-dom";
import { useState } from "react";

let StyledMenu = styled.div`
  overflow: hidden;
  border-right: 1px solid #fff;
  transition: width 0.3s;

  // width: ${(props) => (props.minimized ? "6.4rem" : "100%")};
  width: ${(props) => (props.minimized ? "auto" : "100%")};

  @media (max-width: 768px) {
    z-index: 1000;
    position: absolute;
    top: 0px;
    left: 0px;
    display: ${(props) => (props.minimized ? "block" : "none")};
    background-color: rgba(37, 36, 35, 0.95);
  }
`;

let MenuItemList = styled.div`
  transition: all 0.3s;
`;

let CustomX = styled(X)`
  display: "none";
  @media (max-width: 768px) {
    display: "block";
  }
`;

function CustomStyledMenuItem(props) {
  return (
    <StyledMenuItem
      minimized={props.minimized}
      isActive={props.isActive}
      onClick={props.onClick}
    >
      {props.icon}
      <Togglable
        visible={!props.minimized}
        onTransitionEnd={(e) => {
          console.log("MIN>", props.minimized);

          if (props.minimized) {
            document
              .querySelectorAll(`[id^="menu-button-text"]`)
              .forEach((el) => {
                console.log("EL: ", el.id);
                el.style.display = "none";
              });
          }
        }}
      >
        <h4 id="menu-button-text">{props.text}</h4>
      </Togglable>
    </StyledMenuItem>
  );
}

function Menu({ minimized, toggleSideMenu }) {
  let [activeTabId, setActiveTab] = useState();
  useEffect(() => {
    if (!minimized) {
      document
        .querySelectorAll(`[id^="menu-button-text"]`)
        .forEach((el) => (el.style.display = "block"));
    }
  });

  const mediaQuery = window.matchMedia("(min-width: 768px)");
  // const mediaQuery2 = window.matchMedia("(max-width: 768px)");

  let handleWidthChange = (e) => {
    if (e.matches) {
      console.log("TEST!", e);
      document.getElementById("close-button") &&
        (document.getElementById("close-button").style.display = "none");
    } else {
      console.log("TEST!2", e);
      document.getElementById("close-button") &&
        (document.getElementById("close-button").style.display = "block");
    }
  };

  mediaQuery.addListener(handleWidthChange);
  // mediaQuery.addListener(toggleSideMenu);

  return (
    <StyledMenu id="menu" minimized={minimized}>
      <MenuItemList minimized={minimized}>
        {/* {window.screen.width <= 768 && ( */}
        <X
          id="close-button"
          size="4.4rem"
          color="#fff"
          onClick={toggleSideMenu}
        />
        {/* )} */}
        {/* <CustomX> */}
        {/* <CustomX
          id="close-button"
          size="4.4rem"
          color="#fff"
          onClick={toggleSideMenu}
        /> */}
        {/* </CustomX> */}

        <Link to="/">
          <CustomStyledMenuItem
            id="btn0"
            minimized={minimized}
            isActive={"btn0" === activeTabId}
            text={"Home"}
            icon={<Home size="4.4rem" color="#fff" />}
            onClick={() => setActiveTab("btn0")}
          ></CustomStyledMenuItem>
        </Link>
        <Link to="/test2">
          <CustomStyledMenuItem
            id="btn1"
            minimized={minimized}
            isActive={"btn1" === activeTabId}
            text={"ROI Calculator (Classic Layout)"}
            icon={<LineChart size="4.4rem" color="#fff" />}
            onClick={() => setActiveTab("btn1")}
          ></CustomStyledMenuItem>
        </Link>
        <Link to="/test">
          <CustomStyledMenuItem
            id="btn2"
            minimized={minimized}
            isActive={"btn2" === activeTabId}
            text={"ROI Calculator (Single Card Layout)"}
            icon={<BarChartAlt2 size="4.4rem" color="#fff" />}
            onClick={() => setActiveTab("btn2")}
          ></CustomStyledMenuItem>
        </Link>
      </MenuItemList>
    </StyledMenu>
  );
}

export default Menu;
