import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CHART_WIDTH, CHART_HEIGHT } from '../constants.js';

function BarChart({ chartData }) {
  return <Bar data={chartData}
            options={{ maintainAspectRatio: false }}
                 height={CHART_HEIGHT}
                 width={CHART_WIDTH}
  />;
}

export default BarChart;
