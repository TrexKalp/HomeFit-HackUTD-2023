import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Input,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [approvalStats, setApprovalStats] = useState({
    approved: 0,
    declined: 0,
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/api/process-batch", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setApprovalStats(result);
      setUploadStatus({
        type: "success",
        message: "File processed successfully.",
      });
    } catch (error) {
      setUploadStatus({ type: "error", message: "File upload failed." });
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Flex minH={"80vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Upload Your CSV File
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Input
              type="file"
              p={1}
              accept=".csv"
              onChange={handleFileChange}
            />
            <Button
              onClick={handleFileUpload}
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              isDisabled={!file}
            >
              Upload
            </Button>
            <Stack spacing={4}>
              {/* ...file input and upload button */}
              {uploadStatus && (
                <Alert status={uploadStatus.type}>
                  <AlertIcon />
                  {uploadStatus.message}
                </Alert>
              )}
              {approvalStats && ( // Conditional rendering based on approvalStats
                <Text>
                  Approved: {approvalStats.approved} | Declined:{" "}
                  {approvalStats.declined}
                </Text>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
