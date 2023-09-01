import { colorSet1, colorSet2 } from './constants.js';
import { useState } from "react";
import "./App.css";
import { UserData } from "./Data";
import ControlsWrapper from "./components/ControlsWrapper";
import ChartRenderer from './components/ChartRenderer';

function App() {
  const [xAxisMetric, setXAxisMetric] = useState('ServiceType');
  const [yAxisMetric, setYAxisMetric] = useState('PricePerUnit');
  const [chartType, setChartType] = useState('Bar');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [charts, setCharts] = useState([]);

  const clusterIDs = Array.from(new Set(UserData.map(data => data.cluster_id)));

  const colorSet1 = [
    "rgba(75,192,192,1)",
    "#ecf0f1",
    "#50AF95",
    "#f3ba2f",
    "#2a71d0",
  ];

  const colorSet2 = [
    "rgba(255,99,132,1)",
    "#f39c12",
    "#3498db",
    "#c0392b",
    "#8e44ad",
  ];

  const generateChartData = (index) => {
    let filteredData = UserData;

    if (selectedCluster) {
      filteredData = UserData.filter(data => data.cluster_id === selectedCluster);
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

  const handleDeleteChart = (index) => {
    setCharts(prevCharts => prevCharts.filter((_, idx) => idx !== index));
  };

  const handleAddChart = () => {
    const newChart = {
      chartType,
      xAxisMetric,
      yAxisMetric,
      clusterName: selectedCluster || 'All Clusters',
      data: generateChartData(charts.length)
    };
    setCharts(prevCharts => [...prevCharts, newChart]);
  };

  return (
    <div className="App">
        <h1 className="app-title">AWS Services Price Dashboard</h1>

        <ControlsWrapper
                selectedCluster={selectedCluster} setSelectedCluster={setSelectedCluster}
                xAxisMetric={xAxisMetric} setXAxisMetric={setXAxisMetric}
                yAxisMetric={yAxisMetric} setYAxisMetric={setYAxisMetric}
                chartType={chartType} setChartType={setChartType}
                clusterIDs={clusterIDs}
                onAddChart={handleAddChart}
        />

        <div className="charts-wrapper">
            {charts.map((config, index) => (
              <div key={index} className="chart-container">
                <ChartRenderer config={config} onDelete={() => handleDeleteChart(index)} />
              </div>
            ))}
        </div>
    </div>
  );
}

export default App;