import React, { useState } from "react";

import ComputeRoi from "./services/ComputeRoi";

import Input from "./Components/Input";

import LineChart from "./charts/LineChart/LineChart";
import styled from "styled-components";

let Main = styled.div`
  // background-color: #252423;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    191deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 0, 0, 1) 30%,
    rgba(143, 175, 255, 1) 100%
  );
`;

let MainContent = styled.div`
  margin: 0 auto;
  max-width: 50%;
`;

let Footer = styled.div`
  margin-top: 2rem;
  padding: 1.4rem 1rem;
  border-top: 1px solid #eee;
`;

let GraphInputContainer = styled.div`
  padding: 1rem;
  display: grid;
  max-width: 200rem;
  gap: 1rem;
`;

let Container = styled.div`
  background: #eee;
  padding: 1rem;
  border-radius: 9px;
`;

let Title = styled.h1`
  color: #fff;
`;

let Dashboard = () => {
  const [investment, setInvestment] = useState(1000);
  const [interestRate, setInterestRate] = useState(0.1);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [fee, setFee] = useState(0);

  let data = ComputeRoi.roiForPeriod(
    investment,
    interestRate,
    fee,
    investmentPeriod
  ).map((row) => {
    return {
      x: row.x,
      y: row.y,
    };
  });

  return (
    <Main>
      <MainContent>
        <GraphInputContainer>
          <Title>ROI Calculator</Title>
          <Container>
            <Input title="Investment" setValue={setInvestment} />
            <Input title="Interest Rate" setValue={setInterestRate} />
            <Input title="Investment Period" setValue={setInvestmentPeriod} />
            <Input title="Yearly Management Costs " setValue={setFee} />
          </Container>
          <Container>
            <LineChart data={data} />
          </Container>
        </GraphInputContainer>
      </MainContent>
      <Footer style={{ height: 20 }}>
        <div style={{ marginTop: -10 }}>
          See the code <a href="">here</a>; Author{" "}
          <a href="https://pesalu.github.io/petri-luukkonen-profile">
            Petri Luukkonen
          </a>
          ;
        </div>
      </Footer>
    </Main>
  );
};

export default Dashboard;
