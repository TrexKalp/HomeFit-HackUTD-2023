import React, { useState } from "react";
import axios from "axios";
import { Container, Input, Button, VStack, useToast } from "@chakra-ui/react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const toast = useToast();

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3001/api/upload", formData)
      .then((response) => {
        toast({
          title: "File Uploaded.",
          description: "Your file has been uploaded successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log("File uploaded successfully:", response.data);
      })
      .catch((error) => {
        toast({
          title: "Error Uploading File.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Error uploading file:", error);
      });
  };

  return (
    <Container centerContent p={4}>
      <VStack spacing={5}>
        <Input type="file" onChange={onFileChange} p={1} accept=".csv" />
        <Button colorScheme="blue" onClick={onFileUpload} disabled={!file}>
          Upload
        </Button>
      </VStack>
    </Container>
  );
};

export default FileUpload;
