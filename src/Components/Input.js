import React from "react";
import styled from "styled-components";

let InputS = styled.input`
  margin-bottom: 0.2em;
  width: 90%;
  padding: 0.6rem;
  font-size: 1rem;
  border: none;
  background-color: #fcfcf;
  border-radius: 9px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-width: 30rem;
`;

let Label = styled.label`
  font-family: "Rubik", sans-serif;
  display: block;
  color: #0b0a0;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
`;

let Container = styled.div`
  margin-bottom: 1.2rem;
`;

let Input = ({ title, setValue }) => {
  let changeValue = (event) => {
    console.log("VALUE: ", event.target.value);
    setValue(parseFloat(event.target.value));
  };
  let placeholderText = "Insert number";
  return (
    <Container>
      <Label>{title}</Label>
      <InputS
        type="number"
        defaultValue={0}
        placeholder={placeholderText}
        onChange={changeValue}
      ></InputS>
    </Container>
  );
};

export default Input;
