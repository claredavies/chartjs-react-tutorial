import React, { useState, useEffect } from 'react';

function ControlsWrapper({
  selectedCluster, setSelectedCluster, clusterIDs,
  selectedDataType, setSelectedDataType,
  xAxisMetric, setXAxisMetric,
  yAxisMetric, setYAxisMetric,
  chartType, setChartType,
  onAddChart
}) {

  const xAxisOptions = {
    'Instances': [
      { value: "ServiceType", label: "Service Type" },
      { value: "ClusterName", label: "Cluster Name" },
    ],
    'Applications': [
      { value: "ApplicationName", label: "Application Name" }
      // Add relevant x-axis options for Applications here
    ]
  };

  const yAxisOptions = {
    'Instances': [
      { value: "PricePerUnit", label: "Price Per Unit" },
      { value: "EC2PricePerUnit", label: "EC2 Price Per Unit" },
      { value: "EMRPricePerUnit", label: "EMR Price Per Unit" },
    ],
    'Applications': [
       { value: "ElapsedTime", label: "Elapsed Time" },
       { value: "AttributedCost", label: "Attributed Cost" },

      // Add relevant y-axis options for Applications here
    ]
  };

  useEffect(() => {
    // Reset x and y axis metrics when changing data type
    setXAxisMetric(xAxisOptions[selectedDataType][0].value);
    setYAxisMetric(yAxisOptions[selectedDataType][0].value);
  }, [selectedDataType]);

  return (
    <div className="dropdown-wrapper">
      <span>Select Data Type: </span>
      <select value={selectedDataType} onChange={e => setSelectedDataType(e.target.value)}>
        <option value="Instances">Instances</option>
        <option value="Applications">Applications</option>
      </select>

      <span>Select Cluster: </span>
      <select value={selectedCluster} onChange={e => setSelectedCluster(e.target.value)}>
        <option value="">All Clusters</option>
        {clusterIDs.map(id => <option key={id} value={id}>{id}</option>)}
      </select>

      <span>Select X-axis: </span>
      <select value={xAxisMetric} onChange={e => setXAxisMetric(e.target.value)}>
        {xAxisOptions[selectedDataType].map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>

      <span>Select Y-axis: </span>
      <select value={yAxisMetric} onChange={e => setYAxisMetric(e.target.value)}>
        {yAxisOptions[selectedDataType].map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>

      <span>Select Chart Type: </span>
      <select value={chartType} onChange={e => setChartType(e.target.value)}>
        <option value="Bar">Bar Chart</option>
        <option value="Line">Line Chart</option>
        <option value="Pie">Pie Chart</option>
      </select>
      <button onClick={onAddChart}>Add Chart</button>
    </div>
  );
}

export default ControlsWrapper;
