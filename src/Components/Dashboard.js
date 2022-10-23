import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { roiForPeriod } from "../services/ComputeRoi";

import styled from "styled-components";

import Header from "./Header";
import Menu from "./Menu";
import { RoiCalculator } from "./RoiCalculator";
import { RoiCalculatorSingleCard } from "./RoiCalculatorSingleCard";
import { BarChartSquare } from "@styled-icons/boxicons-regular";

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

  @media screen and (max-width: 1120px) {
    width: 100%;
  }
`;

let Footer = styled.div`
  padding: 1.4rem 1rem;
  border-top: 1px solid #eee;
  color: #fff;
`;

let Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
      <Router>
        <Header toggleSideMenu={toggleSideMenu} minimized={minimized}></Header>
        <Layout>
          <Menu minimized={minimized} toggleSideMenu={toggleSideMenu}></Menu>
          <MainContent>
            <Routes>
              <Route path="/*">
                <Route
                  index
                  element={
                    <div
                      style={{
                        width: "60%",
                        margin: "auto auto",
                        opacity: 0.1,
                      }}
                    >
                      <BarChartSquare color="grey" />
                    </div>
                  }
                />
                <Route
                  path="roicalculator/classic"
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
                  path="roicalculator/singlecard"
                  element={
                    <RoiCalculatorSingleCard
                      investment={investment}
                      setInvestment={setInvestment}
                      interestRate={interestRate}
                      setInterestRate={setInterestRate}
                      investmentPeriod={investmentPeriod}
                      setInvestmentPeriod={setInvestmentPeriod}
                      fee={fee}
                      setFee={setFee}
                      data={data}
                    ></RoiCalculatorSingleCard>
                  }
                />
              </Route>
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
