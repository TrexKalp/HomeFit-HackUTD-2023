import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
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
        const parsedData = rows.slice(1).map((row) =>
          row.split(",").reduce((acc, val, index) => {
            acc[headers[index]] = val;
            return acc;
          }, {})
        );
        setData(parsedData);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); // Polling every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
              stroke={colors[0]}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="MONTHLY_CAR_PAYMENT"
              stroke={colors[1]}
            />
            <Line
              type="monotone"
              dataKey="STUDENT_LOAN_PAYMENT"
              stroke={colors[2]}
            />
            <Line
              type="monotone"
              dataKey="EST_MONTHLY_MORTGAGE_PAYMENT"
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
    </>
  );
};

export default DebtGraph;
