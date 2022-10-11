import styled from "styled-components";

export let GraphInputContainer = styled.div`
  padding: 1rem;
  display: grid;
  width: 100%;
  gap: 1rem;
`;

export let Container = styled.div`
  background: #eee;
  padding: 1rem;
  border-radius: 9px;
`;

export let TitleContainer = styled.h1`
  font-size: 3rem;
  color: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;

  // transition: all 0.3s;
  // opacity: ${(props) => (props.visible ? 1 : 0)};
`;
export let TitleContainer2 = styled.div`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 1rem;

  display: flex;
  align-items: center;
`;
export let Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;

  transition: all 0.3s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

export let Togglable = styled.div`
  transition: all 0.3s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) =>
    props.visible ? "translateX(0%)" : "translateX(-100%)"};
`;

export let StyledMenuItem = styled.div`
  display: flex;
  // gap: 1rem;
  align-items: center;
  padding: 1rem;
  color: #fff;
  font-size: 1.4rem;
  transition: all 0.3s;
  border-bottom: 1px solid #252423;

  gap: ${(props) => (props.minimized ? "0rem" : "1rem")};

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
  // padding: 0.5rem 0rem;
  // margin-top: 1rem;
  font-size: 1.4rem;
  transition: all 0.3s;
  border-bottom: 1px solid #252423;

  &:hover {
    border-bottom: 1px solid #eee;
    background-color: #605e5c;
  }
`;
