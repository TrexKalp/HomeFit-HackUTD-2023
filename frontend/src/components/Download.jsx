import React from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";

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
    <Button onClick={handleDownload} colorScheme="blue">
      Download CSV
    </Button>
  );
};

export default Download;
