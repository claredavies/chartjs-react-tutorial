import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CHART_WIDTH, CHART_HEIGHT } from '../constants.js';
import CommonChartWrapper from './CommonChartWrapper';  // Import the CommonChartWrapper

function LineChart({ chartData, xAxisMetric, yAxisMetric, clusterName, onDelete, showDelete }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: xAxisMetric + " vs " + yAxisMetric
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
        <Line data={chartData} options={options} height={CHART_HEIGHT} width={CHART_WIDTH} />
      </CommonChartWrapper>
    );
}

export default LineChart;