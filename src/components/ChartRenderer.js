import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

function ChartRenderer({ config, onDelete, showDelete }) {
  const { chartType, data, xAxisMetric, yAxisMetric, clusterName } = config;

  switch (chartType) {
    case 'Bar':
      return (
        <BarChart
          chartData={data}
          xAxisMetric={xAxisMetric}
          yAxisMetric={yAxisMetric}
          clusterName={clusterName}
          showDelete={showDelete}
          onDelete={onDelete}
        />
      );

    case 'Line':
      return (
        <LineChart
          chartData={data}
          xAxisMetric={xAxisMetric}
          yAxisMetric={yAxisMetric}
          clusterName={clusterName}
          showDelete={showDelete}
          onDelete={onDelete}
        />
      );

    case 'Pie':
      return (
        <PieChart
          chartData={data}
          xAxisMetric={xAxisMetric}
          yAxisMetric={yAxisMetric}
          clusterName={clusterName}
          showDelete={showDelete}
          onDelete={onDelete}
        />
      );

    default:
      return null;
  }
}

export default ChartRenderer;