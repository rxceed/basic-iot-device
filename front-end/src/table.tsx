import React, { useEffect, useState } from "react";

type JsonData = Record<string, string | number | boolean>;

const RealTimeTable: React.FC = () => {
  const [data, setData] = useState<JsonData>({
    time: "",
    Temperature: 0,
    Humidity: 0,
    Water: 0,
  });
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData: JsonData = {
        time: new Date().toLocaleTimeString(),
        Temperature: Math.floor(Math.random() * 100),
        Humidity: Math.floor(Math.random() * 100),
        Water: Math.random() > 0.66 ? "Tidak Hujan" : Math.random() > 0.5 ? "Gerimis" : "Lebat",
      };

      setData(newData);
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

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
        }}
    >        
      <h2>Real-Time Data Table</h2>
        <table style={{borderCollapse: "collapse" }}>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
              <th scope="row" style={thStyle}>{key}</th>
              <td style={tdStyle}>{String(value)}</td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
};

const tdStyle: React.CSSProperties = {
  backgroundColor: "#242424",
  padding: "8px 12px",
  border: "1px solid #ccc",
  textAlign: "left",
};

const thStyle: React.CSSProperties = {
  ...tdStyle,
  backgroundColor: "#f0f0f0",
  fontWeight: "bold",
  textTransform: "capitalize",
  color: "#242424"
};

export default RealTimeTable;
