import React from "react";
import axios from "axios";
import { Button, Heading } from "@chakra-ui/react";
import CsvDataTable from "./CsvDataTable";

const Download = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:3001/download-csv", {
        responseType: "blob", // Important to process the binary 'blob' file
      });

      // Create a new Blob object using the response data of the file
      const blob = new Blob([response.data], { type: "text/csv" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "data.csv"); // Any file name you want to give it
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Clean up
    } catch (error) {
      console.error("Error during file download", error);
    }
  };

  return (
    <>
      <Heading as="h2" size="xl" mb={4}>
        View and Download Your CSV Data
      </Heading>
      <CsvDataTable />
      <Button
        onClick={handleDownload}
        colorScheme="blue"
        style={{
          marginTop: "15%",
          marginLeft: "45%",
        }}
      >
        Download CSV
      </Button>
    </>
  );
};

export default Download;
