import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CHART_WIDTH, CHART_HEIGHT } from '../constants.js';

function PieChart({ chartData }) {
  return <Pie data={chartData}
  options={{ maintainAspectRatio: false }}
                           height={CHART_HEIGHT}
                           width={CHART_WIDTH}
  />;
}

export default PieChart;
