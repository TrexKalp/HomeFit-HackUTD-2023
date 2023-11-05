import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const ApprovalPieChart = () => {
  const [approvalData, setApprovalData] = useState([]);

  useEffect(() => {
    const fetchApprovalCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/approval-counts"
        );
        const { approved, notApproved } = response.data;
        setApprovalData([
          { name: "Approved", value: approved },
          { name: "Not Approved", value: notApproved },
        ]);
      } catch (error) {
        console.error("Error fetching approval counts:", error);
      }
    };

    fetchApprovalCounts(); // fetch immediately on mount
    const interval = setInterval(fetchApprovalCounts, 2000); // then every 2 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={approvalData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {approvalData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ApprovalPieChart;
