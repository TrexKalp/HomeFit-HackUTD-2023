import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Graphs = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/api/approval-counts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setChartData({
          labels: ["Approved", "Not Approved"],
          datasets: [
            {
              label: "Approval Counts",
              data: [data.approved, data.declined],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Approval Pie Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default Graphs;
