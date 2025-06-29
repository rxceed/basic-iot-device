import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

type JsonData = Record<string, string | number | boolean>;

const API_BASE_URI: string = import.meta.env.VITE_API_BASE_URI as string;

const RealTimeTable: React.FC = () => {
  const [data, setData] = useState<JsonData>({
    time: "",
    temperature: 0,
    humidity: 0,
    intensity: 0,
  });

  const [temperatureHistory, setTemperatureHistory] = useState<number[]>([]);
  const [humidityHistory, setHumidityHistory] = useState<number[]>([]);
  const [intensityHistory, setIntensityHistory] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const intensityLabels = ["Tidak Hujan", "Hujan Gerimis", "Hujan Deras"];

  useEffect(()=>{
    const interval = setInterval(() => {
      fetch(`${API_BASE_URI}/api/sensor_reading`, {
      mode: "cors",
      method: "GET"}).then().
      then((tableData)=>tableData.json())
      .then((data)=>{
        const latestDataIndex = data.length - 1
        const time = new Date(data[latestDataIndex].timestamp).toLocaleString();
        const newData: JsonData = {
          time: time,
          temperature: data[latestDataIndex].temperature.toFixed(1),
          humidity: data[latestDataIndex].humidity,
          intensity: data[latestDataIndex].rain_intensity
        }
        setData(newData);
        setTemperatureHistory((prev) => [...prev.slice(-9), data[latestDataIndex].temperature]);
        setHumidityHistory((prev) => [...prev.slice(-9), data[latestDataIndex].humidity.toFixed(1)]);
        setIntensityHistory((prev) => [...prev.slice(-9), data[latestDataIndex].rain_intensity]);
        setLabels((prev) => [...prev.slice(-9), time]);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  const chartDataTemHum = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: temperatureHistory,
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.1)",
        fill: true,
      },
      {
        label: "Humidity",
        data: humidityHistory,
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.1)",
        fill: true,
      },
    ],
  };

  const chartOptionsTemHum = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  const mapIntensity = (value: any, index: any, array: any) => {
    if(value === "Tidak Hujan") return 0;
    else if(value === "Hujan Gerimis") return 1;
    else if(value === "Hujan Deras") return 2;
  }

  const chartDataIntensity = {
    labels: labels,
    datasets: [
      {
        label: "Rain Intensity",
        data: intensityHistory.map(mapIntensity),
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.1)",
        fill: true,
      },
    ],
  };

  const chartOptionsIntensity = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      scales: {
          y: {
            min: 0,
            max: intensityLabels.length-1
          }
        }
    },
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        gap: "2rem",
        backgroundColor: "transparent",
      }}    
    >
      <h2>Real-Time Data Table</h2>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <th scope="row" style={thStyle}>
                {key}
              </th>
              <td style={tdStyle}>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <div style={{ 
          width: "45%",
          height: "90%",
          minWidth: "600px",
          minHeight: "300px",
          background: "rgba(255,255,255,0.7)", 
          borderRadius: "16px" }}>
          <Line data={chartDataTemHum} options={chartOptionsTemHum} />
        </div>
        <div style={{ 
          width: "45%",
          height: "90%",
          minWidth: "600px",
          minHeight: "300px",
          background: "rgba(255,255,255,0.7)", 
          borderRadius: "16px" }}>
          <Line data={chartDataIntensity} options={chartOptionsIntensity} />
        </div>
      </div>
      <div style={{
        width: "90%",
        maxWidth: "2000px",
        background: "transparent",
        borderRadius: "16px",
        textAlign: "center"
      }}>
        <p>Muhammad Risang Radityatama 5024231028 || 
          Bintang Narindra Putra Pratama 5024231038 || 
          Muhammad Zia Alhambra 5024231059 || 
          Muhammad Rafila Putra Firmansyah 5024231066</p>
      </div>
    </div>
  );
};

const tdStyle: React.CSSProperties = {
  backgroundColor: "#242424",
  padding: "8px 12px",
  border: "1px solid #ccc",
  textAlign: "left",
  color: "white",
};

const thStyle: React.CSSProperties = {
  ...tdStyle,
  backgroundColor: "#f0f0f0",
  fontWeight: "bold",
  textTransform: "capitalize",
  color: "#242424",
};

export default RealTimeTable;
