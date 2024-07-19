import * as React from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import ChartData from "../../Interfaces/ChartData";

interface HorizontalBarPlotProps {
  data: ChartData[];
}
const HorizontalBarPlot: React.FC<HorizontalBarPlotProps> = ({ data }) => {
  const mappedChartData = data.map((item) => ({
    label: item.label,
    data: [item.value],
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["scores"] /* , barGapRatio: 1 */ }]}
        height={250}
        /* width={600} */

        series={mappedChartData}
        skipAnimation={false}
        /* layout="horizontal" */
      />
    </Box>
  );
};
export default HorizontalBarPlot;
