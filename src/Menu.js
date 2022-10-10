import React from "react";
import { TitleContainer2, Togglable } from "./StyledContainers";
import styled from "styled-components";

import { useState } from "react";

import { LeftArrow } from "@styled-icons/boxicons-regular";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

let StyledMenu = styled.div`
  // background-color: #fff;
  padding: 1rem;
`;

let StyledMenuItem = styled.div`
  color: #fff;
  padding: 0.5rem 0rem;
  margin-top: 1rem;
  font-size: 1.4rem;
  min-width: 12rem;
  border-bottom: 1px solid #eee;
  transition: all 0.3s;

  &:hover {
    background-color: #605e5c;
  }
`;

let MenuItemList = styled.div`
  transition: all 0.3s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) =>
    props.visible ? "translateX(0%)" : "translateX(-100%)"};
`;

let CustomLeftArrow = styled.div`
  font-size: 1.4rem;
`;

function Menu() {
  let [visible, setVisibility] = useState(true);
  let toggleVisibility = () => {
    setVisibility(!visible);
  };

  return (
    <StyledMenu>
      <TitleContainer2
        onClick={() => {
          toggleVisibility();
        }}
      >
        <Togglable
          visible={!visible}
          style={{ display: !visible ? "block" : "none" }}
        >
          X
        </Togglable>
        <Togglable visible={visible}>
          <StyledMenuItem>MENU</StyledMenuItem>
        </Togglable>
      </TitleContainer2>
      <MenuItemList visible={visible}>
        <Link to="/test">
          <StyledMenuItem>ROI Calculator</StyledMenuItem>
        </Link>
        <Link to="/test2">
          <StyledMenuItem>Finance </StyledMenuItem>
        </Link>
      </MenuItemList>
    </StyledMenu>
  );
}

export default Menu;
