import React from "react";
import NumberInput from "./NumberInput";
import LineChart from "../charts/LineChart/LineChart";
import { GraphInputContainer, Title, Container } from "../StyledContainers";
import styled from "styled-components";

let CustomLayout = styled.div`
  padding: 1rem;
  width: 100%;
`;

let Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

let CustomGraphInputContainer = styled(GraphInputContainer)`
  padding: 0rem;
`;

let RoundedContainerLeft = styled(Container)`
  border-radius: 0px;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  border-right: solid 1px grey;
`;

let RoundedContainerRight = styled(Container)`
  border-radius: 0px;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
`;

export function PortfolioOverview(props) {
  return (
    <GraphInputContainer>
      <Title>ROI Calculator 2</Title>
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
