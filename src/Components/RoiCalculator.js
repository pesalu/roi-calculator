import React from "react";
import Input from "./NumberInput";
import LineChart from "../charts/LineChart/LineChart";
import {
  GraphInputContainer,
  TitleContainer,
  Container,
} from "./StyledContainers";
import styled from "styled-components";

let GraphInputContainerCustom = styled(GraphInputContainer)`
  height: auto;
`;

export function RoiCalculator(props) {
  return (
    <GraphInputContainerCustom>
      <TitleContainer visible={true}>
        ROI Calculator (Classic Layout)
      </TitleContainer>
      <Container>
        <Input
          title="Investment"
          defaultValue={props.investment}
          setValue={props.setInvestment}
        />
        <Input
          title="Interest Rate"
          defaultValue={props.interestRate}
          setValue={props.setInterestRate}
        />
        <Input
          title="Investment Period"
          defaultValue={props.investmentPeriod}
          setValue={props.setInvestmentPeriod}
        />
        <Input
          title="Yearly Management Costs "
          defaultValue={props.fee}
          setValue={props.setFee}
        />
      </Container>
      <LineChart data={props.data} />
    </GraphInputContainerCustom>
  );
}
