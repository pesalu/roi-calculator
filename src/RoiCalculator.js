import React from "react";
import { useState } from "react";
import Input from "./Components/NumberInput";
import LineChart from "./charts/LineChart/LineChart";
import {
  GraphInputContainer,
  TitleContainer,
  Container,
} from "./StyledContainers";
import { roiForPeriod } from "./services/ComputeRoi";
import styled from "styled-components";
export function RoiCalculator(props) {
  const [investment, setInvestment] = useState(1000);
  const [interestRate, setInterestRate] = useState(0.1);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [fee, setFee] = useState(0);

  let GraphContainer = styled(Container)`
    // width: 80%;
  `;

  return (
    <GraphInputContainer>
      <TitleContainer visible={true}>ROI Calculator</TitleContainer>
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
      <GraphContainer>
        <LineChart data={props.data} />
      </GraphContainer>
    </GraphInputContainer>
  );
}
