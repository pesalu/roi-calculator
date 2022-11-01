import React from "react";
import NumberInput from "./NumberInput";
import LineChart from "../charts/LineChart/LineChart";
import {
  GraphInputContainer,
  Container,
  TitleContainer,
} from "./StyledContainers";
import styled from "styled-components";

let Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
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

let GraphInputContainerCustom = styled(GraphInputContainer)`
  height: auto;
`;

export function RoiCalculatorSingleCard(props) {
  return (
    <GraphInputContainerCustom>
      <TitleContainer>ROI Calculator (Single Card Layout)</TitleContainer>
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
    </GraphInputContainerCustom>
  );
}
