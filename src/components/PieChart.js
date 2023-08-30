import React from "react";
import { Pie } from "react-chartjs-2";
import { CHART_WIDTH, CHART_HEIGHT } from '../constants.js';

function PieChart({ chartData, selectedMetric }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: selectedMetric
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  return <Pie data={chartData} options={options} height={CHART_HEIGHT} width={CHART_WIDTH} />;
}

export default PieChart;
