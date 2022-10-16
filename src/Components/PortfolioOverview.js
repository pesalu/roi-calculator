import React from "react";
import NumberInput from "./NumberInput";
import LineChart from "../charts/LineChart/LineChart";
import { GraphInputContainer, Container } from "../StyledContainers";
import styled from "styled-components";
let Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  // @media (max-width: 768px) {
  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

let RoundedContainerLeft = styled(Container)`
  border-radius: 0px;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  border-right: solid 1px grey;
  transition: all 0.3s;

  @media (max-width: 1120px) {
    border-bottom-left-radius: 0px;
    border-top-right-radius: 9px;
    border-right: solid 1px transparent;
    border-bottom: solid 1px grey;
  }
`;

let RoundedContainerRight = styled(Container)`
  border-radius: 0px;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  transition: all 0.3s;

  @media (max-width: 1120px) {
    border-top-right-radius: 0px;
    border-bottom-left-radius: 9px;
  }
`;

let Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;

  transition: all 0.3s;
`;

export function ControllerLineChartCard(props) {
  return (
    <GraphInputContainer>
      <Title>ROI Calculator (Single Card Layout)</Title>
      <Layout>
        <RoundedContainerLeft>
          <NumberInput
            title="Investment"
            defaultValue={props.investment}
            setValue={props.setInvestment}
          />
          <NumberInput
            title="Interest Rate"
            defaultValue={props.interestRate}
            setValue={props.setInterestRate}
          />
          <NumberInput
            title="Investment Period"
            defaultValue={props.investmentPeriod}
            setValue={props.setInvestmentPeriod}
          />
          <NumberInput
            title="Yearly Management Costs "
            defaultValue={props.fee}
            setValue={props.setFee}
          />
        </RoundedContainerLeft>
        <RoundedContainerRight>
          <LineChart data={props.data} />
        </RoundedContainerRight>
      </Layout>
    </GraphInputContainer>
  );
}
