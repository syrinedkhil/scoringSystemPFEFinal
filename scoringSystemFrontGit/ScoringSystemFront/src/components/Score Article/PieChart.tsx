import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { styled } from '@mui/system';

interface ChartProps {
  data: { value: number; label: string }[];
}

const Piechart: React.FC<ChartProps> = ({ data }) => {
  return (
    <PieChartContainer>
      <PieChart
        series={[{
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 10, additionalRadius: -40, color: 'gray' },
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: 0,
          endAngle: 360,
        }]}
        height={300}
      />
    </PieChartContainer>

  );
};
export default Piechart;

const PieChartContainer = styled('div')`
  width: 100%;
`;
