import styled from "styled-components";

export let GraphInputContainer = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-rows: auto 1fr;
  height: 100%;
`;

export let Container = styled.div`
  background: #eee;
  padding: 1rem;
  border-radius: 9px;
`;

export let TitleContainer = styled.h1`
  font-family: "Inter Tight Bold";
  font-size: 3rem;
  color: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;

  transition: all 0.3s;
`;

export let Togglable = styled.div`
  transition: all 0.3s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) =>
    props.visible ? "translateX(0%)" : "translateX(-100%)"};
`;

export let StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: #fff;
  font-size: 1.4rem;
  transition: all 0.3s;
  border-bottom: 1px solid transparent;
  border-left: 1px solid transparent;

  gap: ${(props) => (props.minimized ? "0rem" : "1rem")};
  background-color: ${(props) => (props.isActive ? "#605e5c" : "")};
  border-left: ${(props) => (props.isActive ? "1px solid #fff" : "")};

  &:hover {
    border-bottom: 1px solid #fff;
    background-color: #605e5c;
  }
`;

export let HeaderMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  color: #fff;
  font-size: 1.4rem;
  transition: all 0.3s;
  border-bottom: 1px solid #252423;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid #eee;
    background-color: #605e5c;
  }
`;
