import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Label,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  Flex,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Card,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { DebtTips } from "./DebtTips";
import { DownAppraisal } from "./DownAppraisal";
import ApprovalPieChart from "./PieChart";
import ApprovedTips from "./ApprovedTips";
import { CreditScoreTips } from "./CreditScoreTips";
import { LtvTips } from "./LTVDTITips";
import { DtiTips } from "./LTVDTITips";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]; // Colors for the lines

const DebtGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get-csv", {
          responseType: "text",
        });
        const rows = response.data.split("\n");
        const headers = rows[0].split(",");
        const parsedData = rows.slice(1).map((row) => {
          const values = row.split(",");
          const dataObj = values.reduce((acc, val, index) => {
            acc[headers[index]] = parseFloat(val) || 0;
            return acc;
          }, {});

          // Calculate DTI - sum of all monthly payments divided by gross monthly income
          const totalMonthlyDebt =
            dataObj.MONTHLY_CAR_PAYMENT +
            dataObj.MONTHLY_CREDIT_CARD_PAYMENT +
            dataObj.STUDENT_LOAN_PAYMENT;
          dataObj.DTI =
            dataObj.GROSS_MONTHLY_INCOME !== 0
              ? Math.round(
                  (totalMonthlyDebt / dataObj.GROSS_MONTHLY_INCOME) * 100
                )
              : 0;

          // Calculate LTV - mortgage amount divided by home appraised value
          const mortgageAmount =
            dataObj.HOME_APPRAISED_VALUE - dataObj.DOWN_PAYMENT_AMOUNT;
          dataObj.LTV =
            dataObj.HOME_APPRAISED_VALUE !== 0
              ? Math.round(
                  (mortgageAmount / dataObj.HOME_APPRAISED_VALUE) * 100
                )
              : 0;

          return dataObj;
        });
        setData(parsedData);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // Polling every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const getApprovalColor = (approvalStatus) => {
    return approvalStatus === "Yes" ? "#00C49F" : "#FF8042";
  };

  return (
    <>
      {" "}
      <Heading as="h2" size="lg" mb={4}>
        Debt Graph
      </Heading>
      <Flex style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10000]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="MONTHLY_CREDIT_CARD_PAYMENT"
              name="Credit Card Payment"
              stroke={colors[0]}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="MONTHLY_CAR_PAYMENT"
              name="Car Payment"
              stroke={colors[1]}
            />
            <Line
              type="monotone"
              dataKey="STUDENT_LOAN_PAYMENT"
              name="Student Loan Payment"
              stroke={colors[2]}
            />
            <Line
              type="monotone"
              dataKey="EST_MONTHLY_MORTGAGE_PAYMENT"
              name="Mortgage Payment"
              stroke={colors[3]}
            />
          </LineChart>
        </ResponsiveContainer>
      </Flex>
      <DebtTips />
      {/* <Heading as="h2" size="lg" my={4}>
        Down Payment vs Appraised Value
      </Heading>
      <Flex style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer height={300}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 50, // Increase this value to provide more space for the label
            }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="HOME_APPRAISED_VALUE"
              name="Appraised Value"
              unit="$"
              label={{
                value: "Appraised Value ($)",
                position: "insideBottom",
                offset: -15,
              }}
            />
            <YAxis
              type="number"
              dataKey="DOWN_PAYMENT_AMOUNT"
              name="Down Payment"
              unit="$"
              // Adjust the angle and position to make sure the label is inside the chart area
              label={{
                value: "Down Payment ($)",
                angle: -90,
                position: "insideLeft",
                offset: -40,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Down Payments" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </Flex> */}
      <Heading as="h2" size="lg" my={4}>
        Down Payment vs Appraised Value
      </Heading>
      <Flex style={{ width: "100%", height: 300 }}>
        <Flex style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                bottom: 30, // Increase bottom margin for XAxis title
                left: 80, // Increase left margin for YAxis title
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="HOME_APPRAISED_VALUE"
                name="Appraised Value"
                unit="$"
                // domain={["auto", "auto"]}
              >
                <Label
                  value="Appraised Value ($)"
                  offset={-50} // Increase the offset to move the label further down
                  position="insideBottom"
                />
              </XAxis>
              <YAxis
                dataKey="DOWN_PAYMENT_AMOUNT"
                name="Down Payment"
                unit="$"
                domain={["auto", 2000000]}
                allowDataOverflow={true}
              >
                <Label
                  value="Down Payment ($)"
                  angle={-90}
                  position="insideLeft"
                  offset={-50} // Adjust this value to move the label left or right as needed
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>

              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="DOWN_PAYMENT_AMOUNT"
                stroke="#8884d8"
                name="Down Payment"
              />
              <Line
                type="monotone"
                dataKey="HOME_APPRAISED_VALUE"
                stroke="#82ca9d"
                name="Appraised Value"
              />
            </LineChart>
          </ResponsiveContainer>
        </Flex>
      </Flex>
      <DownAppraisal />
      <Heading as="h2" size="lg" mb={4} mt={5}>
        Requests Approved
      </Heading>
      <ApprovalPieChart />
      <ApprovedTips />
      {/* Heatmap-like ScatterChart Visualization */}
      <Heading as="h2" size="lg" my={4}>
        Approval Heatmap by Credit Score and Loan Amount
      </Heading>
      <Flex style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 50 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="CREDIT_SCORE" name="Credit Score">
              <Label
                value="Credit Score"
                offset={-15}
                position="insideBottom"
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="DOWN_PAYMENT_AMOUNT"
              name="Loan Amount"
              unit="$"
              domain={["auto", "auto"]}
            >
              <Label
                value="Loan Amount ($)"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }} // This will center the label vertically
                offset={-40}
              />
            </YAxis>

            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Approvals" data={data} fillOpacity={0.6}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getApprovalColor(entry.APPROVED)}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Flex>
      <CreditScoreTips />
      <Heading as="h2" size="lg" my={4}>
        DTI and LTV Ratios
      </Heading>
      <Flex style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="DTI" fill="#8884d8" name="Debt-to-Income Ratio (%)" />
            <Bar dataKey="LTV" fill="#82ca9d" name="Loan-to-Value Ratio (%)" />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
      <Flex direction="row" my={5}>
        <Flex width="50%" pr={2}>
          <LtvTips />
        </Flex>
        <Flex width="50%" pl={2}>
          <DtiTips />
        </Flex>
      </Flex>
    </>
  );
};

export default DebtGraph;
