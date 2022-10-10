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
