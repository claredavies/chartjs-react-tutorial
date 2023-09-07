// chartDataHelpers.js

const generateChartDataForConfig = (transformedInstanceData, chartConfig, colorSet) => {
  let filteredData = transformedInstanceData;

  // Filter data for specific cluster if it's set in the configuration
  if (chartConfig.clusterName && chartConfig.clusterName !== 'All Clusters') {
    filteredData = transformedInstanceData.filter(data => data.ClusterId === chartConfig.clusterName);
  }

  const labels = Array.from(new Set(filteredData.map(data => data[chartConfig.xAxisMetric])));
  const dataValues = labels.map(label => {
    const matchedData = filteredData.filter(d => d[chartConfig.xAxisMetric] === label);
    return matchedData.reduce((sum, curr) => sum + curr[chartConfig.yAxisMetric], 0);
  });

  const colors = colorSet;

  return {
    labels: labels,
    datasets: [
      {
        label: chartConfig.yAxisMetric,
        data: dataValues,
        backgroundColor: colors,
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
};

export { generateChartDataForConfig };