import { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import { UserData } from "./Data";
import ControlsWrapper from "./components/ControlsWrapper"; // <-- Import here

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

  const handleDeleteChart = (index) => {
      setCharts(prevCharts => prevCharts.filter((_, idx) => idx !== index));
    };

   const handleAddChart = () => {
       const newChart = {
         chartType,
         xAxisMetric,
         yAxisMetric,
         clusterName: selectedCluster || 'All Clusters',
         data: generateChartData()
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
                        {config.chartType === 'Bar' && (
                          <BarChart
                            chartData={config.data}
                            xAxisMetric={config.xAxisMetric}
                            yAxisMetric={config.yAxisMetric}
                            clusterName={config.clusterName}
                            onDelete={() => handleDeleteChart(index)}
                          />
                        )}
                        {config.chartType === 'Line' && (
                          <LineChart
                            chartData={config.data}
                            xAxisMetric={config.xAxisMetric}
                            yAxisMetric={config.yAxisMetric}
                            clusterName={config.clusterName}
                            onDelete={() => handleDeleteChart(index)}  // Assuming you made changes to LineChart similar to BarChart
                          />
                        )}
                        {config.chartType === 'Pie' && (
                          <PieChart
                            chartData={config.data}
                            xAxisMetric={config.xAxisMetric}
                            yAxisMetric={config.yAxisMetric}
                            clusterName={config.clusterName}
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