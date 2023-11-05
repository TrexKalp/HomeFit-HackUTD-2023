import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const Graphs = () => {
  const [approvalData, setApprovalData] = useState([]);

  useEffect(() => {
    const fetchApprovalStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/approval-counts"
        );
        setApprovalData([
          { name: "Approved", value: response.data.approved },
          { name: "Not Approved", value: response.data.notApproved },
        ]);
      } catch (error) {
        console.error("Error fetching approval stats:", error);
      }
    };

    fetchApprovalStats();
  }, []);

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={approvalData}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {approvalData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default Graphs;
