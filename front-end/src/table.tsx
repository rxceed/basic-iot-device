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

const RealTimeTable: React.FC = () => {
  const [data, setData] = useState<JsonData>({
    time: "",
    Temperature: 0,
    Humidity: 0,
    Water: 0,
  });

  const [temperatureHistory, setTemperatureHistory] = useState<number[]>([]);
  const [humidityHistory, setHumidityHistory] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString();

      const temp = Math.floor(Math.random() * 100);
      const humid = Math.floor(Math.random() * 100);

      const newData: JsonData = {
        time,
        Temperature: temp,
        Humidity: humid,
        Water:
          Math.random() > 0.66
            ? "Tidak Hujan"
            : Math.random() > 0.5
            ? "Gerimis"
            : "Lebat",
      };

      setData(newData);

      // Add to history (keep max 5 entries)
      setTemperatureHistory((prev) => [...prev.slice(-9), temp]);
      setHumidityHistory((prev) => [...prev.slice(-9), humid]);
      setLabels((prev) => [...prev.slice(-9), time]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
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

  const chartOptions = {
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

      <div style={{ 
        width: "90%", 
        maxWidth: "600px", 
        background: "rgba(255,255,255,0.7)", 
        borderRadius: "16px" }}>
        <Line data={chartData} options={chartOptions} />
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
