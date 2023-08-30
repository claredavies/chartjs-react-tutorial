import React from "react";
import { Line } from "react-chartjs-2";
import { CHART_WIDTH, CHART_HEIGHT } from '../constants.js';

function LineChart({ chartData, selectedMetric }) {
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

  return <Line data={chartData} options={options} height={CHART_HEIGHT} width={CHART_WIDTH} />;
}

export default LineChart;