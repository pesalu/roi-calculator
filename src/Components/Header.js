import React from "react";
import styled from "styled-components";
import { MenuAltLeft, UserCircle, Bell } from "@styled-icons/boxicons-regular";
import { HeaderMenuItem } from "../StyledContainers";
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

let Header = ({ toggleSideMenu }) => {
  return (
    <StyledHeader>
      <HeaderMenuItem onClick={toggleSideMenu}>
        <MenuAltLeft size="4.4rem" color="#fff" />
      </HeaderMenuItem>
      <NavText>FinDat</NavText>
      <NavBar>
        <HeaderMenuItem>
          <Bell size="4.4rem" color="#fff" />
          Notification
        </HeaderMenuItem>
        <HeaderMenuItem>
          <UserCircle size="4.4rem" color="#fff" />
          NavIcon
        </HeaderMenuItem>
      </NavBar>
    </StyledHeader>
  );
};
export default Header;
