import { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import { UserData } from "./Data";

function App() {
  const [xAxisMetric, setXAxisMetric] = useState('ServiceType');
  const [yAxisMetric, setYAxisMetric] = useState('PricePerUnit');
  const [chartType, setChartType] = useState('Bar');
  const [selectedCluster, setSelectedCluster] = useState('');  // New state for the selected cluster.
  const [userData, setUserData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    let filteredData = UserData;

    if (selectedCluster) {
      filteredData = UserData.filter(data => data.cluster_id === selectedCluster);
    }

    const labels = Array.from(new Set(filteredData.map(data => data[xAxisMetric])));
    const dataValues = labels.map(label => {
      const matchedData = filteredData.filter(d => d[xAxisMetric] === label);
      return matchedData.reduce((sum, curr) => sum + curr[yAxisMetric], 0);
    });

    const data = {
      labels: labels,
      datasets: [
        {
          label: yAxisMetric,
          data: dataValues,
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
    setUserData(data);
  }, [xAxisMetric, yAxisMetric, selectedCluster]);  // Add selectedCluster to the dependency array.

  // Unique cluster IDs for dropdown
  const clusterIDs = Array.from(new Set(UserData.map(data => data.cluster_id)));

  return (
    <div className="App">
        <h1 className="app-title">AWS Services Price Dashboard</h1>

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
        </div>

        <div className="charts-wrapper">
            <div className="chart-container">
                {chartType === 'Bar' && <BarChart chartData={userData} xAxisMetric={xAxisMetric} yAxisMetric={yAxisMetric}/>}
                {chartType === 'Line' && <LineChart chartData={userData} xAxisMetric={xAxisMetric} yAxisMetric={yAxisMetric}/>}
                {chartType === 'Pie' && <PieChart chartData={userData} xAxisMetric={xAxisMetric} yAxisMetric={yAxisMetric}/>}
            </div>
        </div>
    </div>
  );
}

export default App;