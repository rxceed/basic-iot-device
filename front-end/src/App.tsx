import RealTimeTable from "./table";

const App: React.FC = () => {
  return (
    <div style={pageStyle}>
      <RealTimeTable />
    </div>
  );
};

const pageStyle: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default App;
