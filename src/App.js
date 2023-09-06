import { colorSet1, colorSet2 } from './constants.js';
import { useState, useEffect } from "react";
import "./App.css";
import ControlsWrapper from "./components/ControlsWrapper";
import ChartRenderer from './components/ChartRenderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCheck } from '@fortawesome/free-solid-svg-icons';
import transformData from './components/dataTransform';

function App() {
  const [jsonData, setJsonData] = useState(null);

  const [selectedDataType, setSelectedDataType] = useState('Instances');
  // Initialize transformedInstanceData as an empty array
  const [transformedInstanceData, setTransformedInstanceData] = useState([]);

  // Fetching data from the API
  useEffect(() => {
      fetch('https://c6d36951-f570-4bce-81d1-802fc1bdbe9e.mock.pstmn.io/estimates')
          .then(response => response.json())
          .then(data => setJsonData(data))
          .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Transform data when necessary
  useEffect(() => {
    if (jsonData) {
        const newData = transformData(jsonData, selectedDataType);
        setTransformedInstanceData(newData);
    }
  }, [selectedDataType, jsonData]);

  const [xAxisMetric, setXAxisMetric] = useState('ServiceType');
  const [yAxisMetric, setYAxisMetric] = useState('PricePerUnit');
  const [chartType, setChartType] = useState('Bar');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [charts, setCharts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const clusterIDs = Array.from(new Set(transformedInstanceData.map(data => data.ClusterId)));

  const generateChartData = (index) => {
    let filteredData = transformedInstanceData;

    // if chose a certain cluster only show info for that cluster
    if (selectedCluster) {
      filteredData = transformedInstanceData.filter(data => data.ClusterId === selectedCluster);
    }

    // grabs the xAxis Values e.g. ClusterName -> emr_cost_estimater_test_cluster
    const labels = Array.from(new Set(filteredData.map(data => data[xAxisMetric])));
    // grabs the yAxis values which match the xAxis points e.g. EMRPricePerUnit is 0.02 for emr_cost_estimater_test_cluster
    const dataValues = labels.map(label => {
      const matchedData = filteredData.filter(d => d[xAxisMetric] === label);
    // to calculate the cumulative value (or sum) of a particular metric (stored in yAxisMetric) for all the entries that match a given label (from the xAxisMetric).
      return matchedData.reduce((sum, curr) => sum + curr[yAxisMetric], 0);
    });

    // so switch between colour schemes for the charts
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

// only allowed to delete when in edit mode
  const handleDeleteChart = (index) => {
    if (!isEditing) {
      console.warn("Deletion is currently not allowed.");
      return;
    }
    // this code is removing an element from the charts array at the given index and
    // then updating the charts state (setCharts is a useState) with the new chart array with the element deleted
    setCharts(prevCharts => prevCharts.filter((_, idx) => idx !== index));
  };

//  The function creates a new array that has all the items from the old charts array
//  (using the spread syntax ...prevCharts) and then adds newChart to the end of it.
//  This new array is then set as the new value for the charts state.
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
              <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
                  <FontAwesomeIcon icon={isEditing ? faCheck : faCog} />
              </button>
        <ControlsWrapper
                selectedCluster={selectedCluster} setSelectedCluster={setSelectedCluster}
                selectedDataType={selectedDataType}
                setSelectedDataType={setSelectedDataType}
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