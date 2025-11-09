// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Optional, for styling

function App() {
  const [cauldronData, setCauldronData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cauldron level data
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

  if (loading) return <div className="p-4">Loading cauldron data...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Cauldron Level Data</h1>
      <p>Records fetched: {cauldronData.length}</p>
      <pre className="bg-gray-100 p-2 rounded mb-4">
        {/* Show first record */}
        {cauldronData.length
          ? JSON.stringify(cauldronData[0], null, 2)
          : "No data"}
      </pre>
      <pre className="bg-gray-100 p-2 rounded mb-4">
        {/* Show last record */}
        {cauldronData.length
          ? JSON.stringify(cauldronData[cauldronData.length - 1], null, 2)
          : ""}
      </pre>
      {/* Ready for visualization*/}
    </div>
  );
}

export default App;