import { colorSet1, colorSet2 } from './constants.js';
import { useState } from "react";
import "./App.css";
import { UserData } from "./Data";
import ControlsWrapper from "./components/ControlsWrapper";
import ChartRenderer from './components/ChartRenderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [xAxisMetric, setXAxisMetric] = useState('ServiceType');
  const [yAxisMetric, setYAxisMetric] = useState('PricePerUnit');
  const [chartType, setChartType] = useState('Bar');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [charts, setCharts] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const clusterIDs = Array.from(new Set(UserData.map(data => data.cluster_id)));

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
    if (!isEditing) {
      console.warn("Deletion is currently not allowed.");
      return;
    }

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
         {/* Add the Edit button here */}
              <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
                  <FontAwesomeIcon icon={isEditing ? faCheck : faCog} />
              </button>
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
                    <ChartRenderer
                        config={config}
                        onDelete={() => handleDeleteChart(index)}
                        showDelete={isEditing}  // Pass the isEditing state as a prop
                    />
                  </div>
                ))}
        </div>
    </div>
  );
}

export default App;