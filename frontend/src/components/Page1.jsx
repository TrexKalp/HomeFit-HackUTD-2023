import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Page1() {
  // States to store the input values
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [appraisalValue, setAppraisalValue] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [creditCardPayment, setCreditCardPayment] = useState("");
  const [carPayment, setCarPayment] = useState("");

  // Function to handle form submission
  const checkEligibility = () => {
    // Construct the data object from state
    const financialData = {
      monthlyIncome,
      creditScore,
      appraisalValue,
      downPayment,
      creditCardPayment,
      carPayment,
    };

    // Send this data to the Express server
    fetch("http://localhost:3001/api/check-eligibility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(financialData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response here
        // For example, you might want to show the result in the UI or alert the user
        alert(`Eligibility Check: ${data.result}`);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  };

  return (
    <Flex minH={"80vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Are you ready to buy a home? Let's Check!
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="monthlyincome" isRequired>
              <FormLabel>Gross Monthly Income</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="credit" isRequired>
              <FormLabel>Credit Score</FormLabel>
              <NumberInput min={300} max={850}>
                <NumberInputField
                  onChange={(e) => setCreditScore(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="Appraisal" isRequired>
              <FormLabel>Appraisal Value</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setAppraisalValue(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="downpayment" isRequired>
              <FormLabel>Down Payment</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="creditcard" isRequired>
              <FormLabel>Credit Card Payment</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setCreditCardPayment(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="carpayment" isRequired>
              <FormLabel>Car Payment</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setCarPayment(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                onClick={checkEligibility}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Check Eligibility
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
