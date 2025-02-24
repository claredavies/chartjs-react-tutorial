import React from "react";
import { Bar } from "react-chartjs-2";
import { CHART_WIDTH, CHART_HEIGHT } from '../constants.js';
import CommonChartWrapper from './CommonChartWrapper';  // Import the CommonChartWrapper

function BarChart({ chartData, xAxisMetric, yAxisMetric, clusterName, onDelete, showDelete }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: xAxisMetric + " vs " + yAxisMetric,
        align: 'center'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisMetric
        }
      },
      y: {
        title: {
          display: true,
          text: yAxisMetric
        }
      }
    }
  };

  return (
    <CommonChartWrapper onDelete={onDelete} showDelete={showDelete}>
      <Bar data={chartData} options={options} height={CHART_HEIGHT} width={CHART_WIDTH} />
    </CommonChartWrapper>
  );
}

export default BarChart;