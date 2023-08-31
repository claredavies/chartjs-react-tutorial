import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CHART_WIDTH, CHART_HEIGHT } from '../constants.js';

function BarChart({ chartData, xAxisMetric, yAxisMetric, onDelete }) {
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
    <div style={{position: 'relative'}}>
      <button
        onClick={onDelete}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          zIndex: 1
        }}>
        X
      </button>
      <Bar data={chartData} options={options} height={CHART_HEIGHT} width={CHART_WIDTH} />
    </div>
  );
}

export default BarChart;