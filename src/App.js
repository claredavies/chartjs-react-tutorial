import { useState, useEffect } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import { UserData } from "./Data";

function App() {
  const [selectedMetric, setSelectedMetric] = useState('userGain');
  const [userData, setUserData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const data = {
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: selectedMetric === 'year' ? 'Year' : (selectedMetric === 'userGain' ? 'Users Gain' : 'Users Lost'),
          data: UserData.map((data) => data[selectedMetric]),
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
  }, [selectedMetric]);

  return (
    <div className="App">
        <h1 className="app-title">User Statistics Dashboard</h1>
        <div className="dropdown-wrapper">
            <select value={selectedMetric} onChange={e => setSelectedMetric(e.target.value)}>
                <option value="userGain">Users Gained</option>
                <option value="userLost">Users Lost</option>
            </select>
        </div>

        <div className="charts-wrapper">
            <div className="chart-container">
                <BarChart chartData={userData} selectedMetric={selectedMetric}/>
            </div>
            <div className="chart-container">
                <LineChart chartData={userData} selectedMetric={selectedMetric}/>
            </div>
            <div className="chart-container">
                <PieChart chartData={userData} selectedMetric={selectedMetric}/>
            </div>
        </div>
    </div>
  );
}

export default App;