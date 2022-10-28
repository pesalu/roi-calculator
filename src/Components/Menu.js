import React from "react";
import { Togglable, StyledMenuItem } from "./StyledContainers";
import styled from "styled-components";

import { useEffect } from "react";
import {
  BarChartAlt2,
  Home,
  LineChart,
  MenuAltLeft,
  ScatterChart,
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

let StyledX = styled(X)`
  display: block;
  @media (min-width: 768px) {
    display: none;
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
        onTransitionEnd={() => {
          props.minimized &&
            document
              .querySelectorAll(`[id^="menu-button-text"]`)
              .forEach((el) => {
                el.style.display = "none";
              });
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

  let menuButtons = [
    {
      path: "/",
      text: "Home",
      icon: <Home size="4.4rem" color="#fff" />,
    },
    {
      path: "/roicalculator/classic",
      text: "ROI Calculator (Classic Layout)",
      icon: <LineChart size="4.4rem" color="#fff" />,
    },
    {
      path: "/roicalculator/singlecard",
      text: "ROI Calculator (Single Card Layout)",
      icon: <BarChartAlt2 size="4.4rem" color="#fff" />,
    },
    {
      path: "/irisdata",
      text: "Scatter Plot (Iris Data)",
      icon: <ScatterChart size="4.4rem" color="#fff" />,
    },
  ];

  return (
    <StyledMenu id="menu" minimized={minimized}>
      <MenuItemList minimized={minimized}>
        <StyledX
          id="close-button"
          size="4.4rem"
          color="#fff"
          onClick={toggleSideMenu}
        />
        {menuButtons.map(({ path, text, icon }, idx) => (
          <Link to={path}>
            <CustomStyledMenuItem
              id="`menu-button-${idx}`"
              minimized={minimized}
              isActive={`menu-button-${idx}` === activeTabId}
              text={text}
              icon={icon}
              onClick={() => setActiveTab(`menu-button-${idx}`)}
            ></CustomStyledMenuItem>
          </Link>
        ))}
      </MenuItemList>
    </StyledMenu>
  );
}

export default Menu;
