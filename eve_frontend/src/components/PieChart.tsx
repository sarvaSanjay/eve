// components/PieChart.js
"use client";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  return (
    <div style={{ width: '300px',height: '400px' }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
