import React from "react";
import styled from "styled-components";

export let NavBar = styled.nav`
  display: flex;
  align-items: center;
`;

export let NavText = styled.div`
  color: #fff;
  font-size: 1.8rem;
  padding: 1rem;

  &:hover {
    background-color: #605e5c;
  }
`;

let StyledHeader = styled.header`
  background-color: #252423;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

let Header = () => {
  return (
    <StyledHeader>
      <NavText>FinDat</NavText>
      <NavBar>
        <NavText>Notification</NavText>
        <NavText>NavIcon</NavText>
      </NavBar>
    </StyledHeader>
  );
};
export default Header;
