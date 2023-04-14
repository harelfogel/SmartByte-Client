import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';



Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

const Insights = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [timeRange, setTimeRange] = useState('monthly');
  const [graphData, setGraphData] = useState({ labels: [], data: [] });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/devices');
        if (isMounted) {
          setDevices(response.data);
          setSelectedDevice(response.data[0].device);
        }
      } catch (error) {
        if (isMounted) {
          console.log(error);
        }
      }
      await fetchGraphData(selectedDevice, timeRange);
    };

    fetchData();

    const fetchAndUpdateGraphData = async () => {
      await fetchGraphData(selectedDevice, timeRange);
    };

    fetchAndUpdateGraphData();

  

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [selectedDevice,timeRange]);

  const fetchGraphData = async (device, timeRange) => {
    try {
      const response = await axios.get('http://localhost:5000/graph-data', {
        params: { device, time_range: timeRange },
      });

      setGraphData(response.data);
    } catch (error) {
      // Handle errors, e.g., update the error state or show an error message
    }
  };

  const handleSelectionChange = (e, type) => {
    if (type === 'device') {
      setSelectedDevice(e.target.value);
      fetchGraphData(e.target.value, timeRange);
    } else {
      setTimeRange(e.target.value);
      fetchGraphData(selectedDevice, e.target.value);
    }
  };
  
  return (
    <div>
      <h1>Energy Consumption Insights</h1>
      <div>
        <label>Device:</label>
        <select
          value={selectedDevice}
          onChange={(e) => handleSelectionChange(e, 'device')}
        >
          {devices.map((device) => (
            <option key={device.device} value={device.device}>
              {device.name}
            </option>
          ))}
        </select>
        <label>Time Range:</label>
        <select
          value={timeRange}
          onChange={(e) => handleSelectionChange(e, 'timeRange')}
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <Line
        data={{
          labels: graphData.labels,
          datasets: [
            {
              label: 'Energy Consumption',
              data: graphData.data,
              fill: false,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: 'category',
            },
            y: {
              type: 'linear',
            },
          },
        }}
      />
      

    </div>
  );
};

export default Insights;

