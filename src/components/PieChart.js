import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CHART_WIDTH, CHART_HEIGHT } from '../constants.js';
import CommonChartWrapper from './CommonChartWrapper';  // Import the CommonChartWrapper

function PieChart({ chartData, xAxisMetric, yAxisMetric, clusterName, onDelete, showDelete }) {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: xAxisMetric + " vs " + yAxisMetric + " for " + clusterName
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
          <Pie data={chartData} options={options} height={CHART_HEIGHT} width={CHART_WIDTH} />
        </CommonChartWrapper>
      );
}

export default PieChart;