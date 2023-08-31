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
  const [selectedCluster, setSelectedCluster] = useState('');
  const [charts, setCharts] = useState([]);

  const clusterIDs = Array.from(new Set(UserData.map(data => data.cluster_id)));

  const generateChartData = () => {
    let filteredData = UserData;

    if (selectedCluster) {
      filteredData = UserData.filter(data => data.cluster_id === selectedCluster);
    }

    const labels = Array.from(new Set(filteredData.map(data => data[xAxisMetric])));
    const dataValues = labels.map(label => {
      const matchedData = filteredData.filter(d => d[xAxisMetric] === label);
      return matchedData.reduce((sum, curr) => sum + curr[yAxisMetric], 0);
    });

    return {
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
  };

  const handleAddChart = () => {
    const newChart = {
      chartType,
      xAxisMetric,
      yAxisMetric,
      data: generateChartData()
    };
    setCharts(prevCharts => [...prevCharts, newChart]);
  };

  const handleDeleteChart = (index) => {
      setCharts(prevCharts => prevCharts.filter((_, idx) => idx !== index));
    };

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

            <button onClick={handleAddChart}>Add Chart</button>
        </div>

        <div className="charts-wrapper">
                    {charts.map((config, index) => (
                      <div key={index} className="chart-container">
                        {config.chartType === 'Bar' && (
                          <BarChart
                            chartData={config.data}
                            xAxisMetric={config.xAxisMetric}
                            yAxisMetric={config.yAxisMetric}
                            onDelete={() => handleDeleteChart(index)}
                          />
                        )}
                        {config.chartType === 'Line' && (
                          <LineChart
                            chartData={config.data}
                            xAxisMetric={config.xAxisMetric}
                            yAxisMetric={config.yAxisMetric}
                            onDelete={() => handleDeleteChart(index)}  // Assuming you made changes to LineChart similar to BarChart
                          />
                        )}
                        {config.chartType === 'Pie' && (
                          <PieChart
                            chartData={config.data}
                            xAxisMetric={config.xAxisMetric}
                            yAxisMetric={config.yAxisMetric}
                            onDelete={() => handleDeleteChart(index)}  // Assuming you made changes to PieChart similar to BarChart
                          />
                        )}
                      </div>
                    ))}
                </div>
    </div>
  );
}

export default App;