export let roi = (investment, interest, cost, year) => {
  let coeff = 1 + interest - cost;
  return investment * Math.pow(coeff, year);
};

export let roiForPeriod = (investment, interest, cost, period) => {
  let values = [];
  for (let year = 0; year <= period; year++) {
    let roiValue = roi(investment, interest, cost, year);
    let row = { x: year, y: roiValue };
    values.push(row);
  }
  return values;
};
