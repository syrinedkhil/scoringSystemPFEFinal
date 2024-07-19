import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

interface MyBarProps {
  data: { value: number; label: string }[];
}

const chartSetting = {
  xAxis: [
    {
      label: "Scores",
    },
  ],
  height: 300,
};

const Barchart: React.FC<MyBarProps> = ({ data }) => {
  return (
    <div style={{marginLeft:'5px'}}>
      <BarChart
        dataset={data}
        yAxis={[{ scaleType: "band", dataKey: "label" }]}
        series={[
          {
            dataKey: "value",
            valueFormatter: (value: number | null) => {
              if (value === null) return ""; 
              return `${value}%`;
            },
          },
        ]}        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
};

export default Barchart;
