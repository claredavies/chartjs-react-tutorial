import { colorSet1, colorSet2 } from '../constants.js';

export const generateChartData = (transformedInstanceData, selectedCluster, xAxisMetric, yAxisMetric, index) => {
    let filteredData = transformedInstanceData;

    if (selectedCluster) {
      filteredData = transformedInstanceData.filter(data => data.ClusterId === selectedCluster);
    }

    const labels = Array.from(new Set(filteredData.map(data => data[xAxisMetric])));
    const dataValues = labels.map(label => {
      const matchedData = filteredData.filter(d => d[xAxisMetric] === label);
      return matchedData.reduce((sum, curr) => sum + curr[yAxisMetric], 0);
    });

    const colors = index % 2 === 0 ? colorSet1 : colorSet2;

    return {
      labels: labels,
      datasets: [
        {
          label: yAxisMetric,
          data: dataValues,
          backgroundColor: colors,
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
};

export const addNewChart = (chartType, xAxisMetric, yAxisMetric, selectedCluster, generateChartData, transformedInstanceData, charts, selectedDataType) => {
    const newChart = {
        chartType,
        xAxisMetric,
        yAxisMetric,
        clusterName: selectedCluster || 'All Clusters',
        data: generateChartData(transformedInstanceData, selectedCluster, xAxisMetric, yAxisMetric, charts.length),
        dataType: selectedDataType
    };

    return [...charts, newChart];
};