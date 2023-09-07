import { colorSet1, colorSet2 } from './constants.js';
import { useState } from "react";
import "./App.css";
import ControlsWrapper from "./components/ControlsWrapper";
import ChartRenderer from './components/ChartRenderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCheck, faSync } from '@fortawesome/free-solid-svg-icons';
import { useAppData } from './customHooks/useAppData';
import { addNewChart, generateChartData } from './utils/chartUtils';
import { generateChartDataForConfig } from './components/GenerateChartDataForConfig';


function App() {
  const {
          jsonData,
          selectedDataType, setSelectedDataType,
          transformedInstanceData, setTransformedInstanceData,
          fetchData, transformData
      } = useAppData();

  const [xAxisMetric, setXAxisMetric] = useState('ServiceType');
  const [yAxisMetric, setYAxisMetric] = useState('PricePerUnit');
  const [chartType, setChartType] = useState('Bar');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [charts, setCharts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const clusterIDs = Array.from(new Set(transformedInstanceData.map(data => data.ClusterId)));

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

 const handleRefreshChart = () => {
     fetchData();

     // Iterate over each chart and transform the data based on its dataType
     const updatedCharts = charts.map(chartConfig => {
         const transformedData = transformData(jsonData, chartConfig.dataType);
         return {
             ...chartConfig,
             data: generateChartDataForConfig(transformedData, chartConfig, colorSet1) // Adjust as needed
         };
     });

     setCharts(updatedCharts);
 };


//  The function creates a new array that has all the items from the old charts array
//  (using the spread syntax ...prevCharts) and then adds newChart to the end of it.
//  This new array is then set as the new value for the charts state.
  const handleAddChart = () => {
      const updatedCharts = addNewChart(chartType, xAxisMetric, yAxisMetric, selectedCluster, generateChartData, transformedInstanceData, charts, selectedDataType);
      setCharts(updatedCharts);
  };

  return (
    <div className="App">
        <h1 className="app-title">AWS Services Price Dashboard</h1>
              <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
                  <FontAwesomeIcon icon={isEditing ? faCheck : faCog} />
              </button>
              <button onClick={handleRefreshChart}>
                   <FontAwesomeIcon icon={faSync} />
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