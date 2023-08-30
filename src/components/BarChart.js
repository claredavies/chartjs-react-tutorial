import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CHART_WIDTH, CHART_HEIGHT } from '../constants.js';

function BarChart({ chartData, selectedMetric }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: selectedMetric
      }
    }
  };

  return <Bar data={chartData} options={options} height={CHART_HEIGHT} width={CHART_WIDTH} />;
}

export default BarChart;