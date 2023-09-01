import React from 'react';

function ControlsWrapper({
  selectedCluster, setSelectedCluster, clusterIDs,
  xAxisMetric, setXAxisMetric,
  yAxisMetric, setYAxisMetric,
  chartType, setChartType,
  onAddChart
}) {
  return (
    <div className="dropdown-wrapper">
                <span>Select Cluster: </span>
                <select value={selectedCluster} onChange={e => setSelectedCluster(e.target.value)}>
                    <option value="">All Clusters</option>
                    {clusterIDs.map(id => <option key={id} value={id}>{id}</option>)}
                </select>

                <span>Select X-axis: </span>
                <select value={xAxisMetric} onChange={e => setXAxisMetric(e.target.value)}>
                    <option value="ServiceType">Service Type</option>
                    <option value="InstanceType">Instance Type</option>
                    <option value="Market">Market</option>
                    <option value="Name">Name</option>
                </select>

                <span>Select Y-axis: </span>
                <select value={yAxisMetric} onChange={e => setYAxisMetric(e.target.value)}>
                    <option value="PricePerUnit">Price Per Unit</option>
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