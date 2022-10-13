import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { roiForPeriod } from "./services/ComputeRoi";

import styled from "styled-components";

import Header from "./Components/Header";
import Menu from "./Menu";
import { RoiCalculator } from "./RoiCalculator";
import { ControllerLineChartCard } from "./Components/PortfolioOverview";

/* DESIGN SYSTEM 

  --- 01 TYPOGRAPHY SYSTEM

  FONT SIZE SYSTEM (px)
  10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

  - Font weights:
  Default: 400
  Medium: 500
  Semi-Bold: 600
  Bold: 700


  - Line heights:
  Default: 1
  Small: 1.05
  Medium: 1.2
  Paragraph default: 1.6
  Large: 1.8

  - Letter spacing
    - 0.5 px, 0.75 px

  --- 02 COLORS
  Primary: 
  Tints: 
  Shades: 
  Accents:
  Greys: 
  #6F6F6F (lightest gray allowed)
  #555
  #333 
  
  */

let Main = styled.div`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    190deg,
    #1e3e57 0%,
    rgba(2, 0, 36, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

let MainContent = styled.div`
  margin: 0 auto;
  width: 80%;

  @media screen and (max-width: 780px) {
    max-width: 100%;
  }
`;

let Footer = styled.div`
  padding: 1.4rem 1rem;
  border-top: 1px solid #eee;
  color: #fff;
`;

let Layout = styled.div`
  display: grid;
  // grid-template-columns: 0.2fr 0.8fr;
  grid-template-columns: auto 1fr;
`;

let Dashboard = () => {
  const [investment, setInvestment] = useState(1000);
  const [interestRate, setInterestRate] = useState(0.1);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [fee, setFee] = useState(0);

  const [minimized, setMinimized] = useState(false);

  let data = roiForPeriod(investment, interestRate, fee, investmentPeriod).map(
    (row) => {
      return {
        x: row.x,
        y: row.y,
      };
    }
  );

  let toggleSideMenu = () => {
    setMinimized(!minimized);
  };

  return (
    <Main>
      <Header toggleSideMenu={toggleSideMenu} minimized={minimized}></Header>
      <Router>
        <Layout>
          <Menu minimized={minimized}></Menu>
          <MainContent>
            <Routes>
              <Route
                path="/test"
                element={
                  <RoiCalculator
                    investment={investment}
                    setInvestment={setInvestment}
                    interestRate={interestRate}
                    setInterestRate={setInterestRate}
                    investmentPeriod={investmentPeriod}
                    setInvestmentPeriod={setInvestmentPeriod}
                    fee={fee}
                    setFee={setFee}
                    data={data}
                  ></RoiCalculator>
                }
              />
              <Route
                path="/test2"
                element={
                  <ControllerLineChartCard
                    investment={investment}
                    setInvestment={setInvestment}
                    interestRate={interestRate}
                    setInterestRate={setInterestRate}
                    investmentPeriod={investmentPeriod}
                    setInvestmentPeriod={setInvestmentPeriod}
                    fee={fee}
                    setFee={setFee}
                    data={data}
                  ></ControllerLineChartCard>
                }
              />
            </Routes>
          </MainContent>
        </Layout>
      </Router>
      <Footer>
        See the code
        <a href="https://github.com/pesalu/roi-calculator">here</a>; Author{" "}
        <a href="https://pesalu.github.io/petri-luukkonen-profile">
          Petri Luukkonen
        </a>
      </Footer>
    </Main>
  );
};

export default Dashboard;
