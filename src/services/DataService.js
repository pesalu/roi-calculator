import { tsv } from "d3";

export let GetAgeData = () => {
  tsv("../demodata/age-data.tsv", (error, data) => {
    if (error) throw error;

    data.forEach((datapoint) => {
      console.log("data", datapoint);
    });
  });
};
