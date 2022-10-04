import { act } from "react-dom/test-utils";

let investment = 1000;
let cost = 0;
let interest = 0.1;

let roi = (investment, interest, cost, year) => {
  console.log(interest, cost);
  let coeff = 1 + interest - cost;
  return investment * Math.pow(coeff, year);
};

let roiForPeriod = (investment, interest, cost, period) => {
  let values = [];
  for (let year = 0; year <= period; year++) {
    let roiValue = roi(investment, interest, cost, year);
    let row = { x: year, y: roiValue };
    values.push(row);
  }
  return values;
};

export default { roi, roiForPeriod };
