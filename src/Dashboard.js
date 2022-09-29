import React, { useState } from "react";

import ComputeRoi from "./services/ComputeRoi";

import Input from "./Components/Input";

import LineChart from "./charts/LineChart/LineChart";
import styled from "styled-components";

let Main = styled.div``;

let MainContent = styled.div`
  margin: 0 auto;
  max-width: 50%;
`;

let Footer = styled.div`
  margin: 1rem 0rem;
  padding: 1.4rem 1rem;
  border-top: 1px solid #eee;
`;

let Container = styled.div`
  // background: red;
  background: #eee;
  padding: 1rem;
  margin: 0.4rem auto;
  border-radius: 9px;
`;

let GraphInputContainer = styled.div`
  background: #fcfcfc;
  max-width: 200rem;
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
