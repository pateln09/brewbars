import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./App.css";

const CAULDRON_IDS = [
  "cauldron_001", "cauldron_002", "cauldron_003", "cauldron_004",
  "cauldron_005", "cauldron_006", "cauldron_007", "cauldron_008",
  "cauldron_009", "cauldron_010", "cauldron_011", "cauldron_012"
];

function App() {
  const [cauldronData, setCauldronData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCauldron, setSelectedCauldron] = useState("cauldron_001");

  useEffect(() => {
    axios
      .get("https://corsproxy.io/?https://hackutd2025.eog.systems/api/Data?start_date=0&end_date=2000000000")
      .then((res) => {
        setCauldronData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Prepare data for chart (timestamp + selected cauldron level)
  const chartData = cauldronData.map((entry) => ({
    time: entry.timestamp.slice(0, 16), // "YYYY-MM-DDTHH:MM"
    level: entry.cauldron_levels[selectedCauldron]
  }));

  if (loading) return <div className="p-4">Loading cauldron data...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Potion Level Trend</h1>
      <label className="block mb-2">
        <span className="mr-2">Select Cauldron:</span>
        <select
          value={selectedCauldron}
          onChange={(e) => setSelectedCauldron(e.target.value)}
          className="p-1 border rounded"
        >
          {CAULDRON_IDS.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </label>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" tick={{fontSize: 10}} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="level" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
