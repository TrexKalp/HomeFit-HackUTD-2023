import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Box, Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";

const CsvDataTable = () => {
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
        console.error("Error fetching data: ", error);
      }
    };

    // Call fetchData every 2 seconds
    const intervalId = setInterval(fetchData, 1000);

    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Gross Monthly Income", accessor: "GROSS_MONTHLY_INCOME" },
      { Header: "Monthly Car Payment", accessor: "MONTHLY_CAR_PAYMENT" },
      {
        Header: "Monthly Credit Card Payment",
        accessor: "MONTHLY_CREDIT_CARD_PAYMENT",
      },
      { Header: "Student Loan Payment", accessor: "STUDENT_LOAN_PAYMENT" },
      { Header: "Home Appraised Value", accessor: "HOME_APPRAISED_VALUE" },
      {
        Header: "Estimated Monthly Mortgage Payment",
        accessor: "EST_MONTHLY_MORTGAGE_PAYMENT",
      },
      { Header: "Down Payment Amount", accessor: "DOWN_PAYMENT_AMOUNT" },
      { Header: "Credit Score", accessor: "CREDIT_SCORE" },
      { Header: "Approved", accessor: "APPROVED" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <Box overflowX="auto">
      <Table
        {...getTableProps()}
        variant="striped"
        colorScheme="teal"
        size="sm"
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CsvDataTable;
