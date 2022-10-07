import React from "react";
import { Title } from "./StyledContainers";
import styled from "styled-components";

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
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: #605e5c;
  }
`;

function Menu() {
  return (
    <StyledMenu>
      <Title>MENU</Title>
      <Link to="/test">
        <StyledMenuItem>ROI Calculator</StyledMenuItem>
      </Link>
      <Link to="/test2">
        <StyledMenuItem>Finance </StyledMenuItem>
      </Link>
    </StyledMenu>
  );
}

export default Menu;
