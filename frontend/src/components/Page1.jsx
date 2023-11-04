import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Page1() {
  // Adjusted state variables to match the server's expected format and added estMonthlyMortgagePayment
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [homeAppraisedValue, setHomeAppraisedValue] = useState("");
  const [downPaymentAmount, setDownPaymentAmount] = useState("");
  const [monthlyCreditCardPayment, setMonthlyCreditCardPayment] = useState("");
  const [monthlyCarPayment, setMonthlyCarPayment] = useState("");
  const [studentLoanPayment, setStudentLoanPayment] = useState("");
  const [estMonthlyMortgagePayment, setEstMonthlyMortgagePayment] =
    useState(""); // Added state for estimated monthly mortgage payment

  // Function to handle form submission
  const checkEligibility = async () => {
    const financialData = {
      grossMonthlyIncome,
      creditScore,
      homeAppraisedValue,
      downPaymentAmount,
      monthlyCreditCardPayment,
      monthlyCarPayment,
      studentLoanPayment,
      estMonthlyMortgagePayment, // Included in the data object
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/check-eligibility",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(financialData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.approved === "Yes") {
        alert("Congratulations! You are eligible to buy a home.");
      } else {
        const suggestionsMessage =
          data.suggestions.length > 0
            ? `Suggestions: ${data.suggestions.join(", ")}`
            : "No suggestions available.";
        alert(`Eligibility Check: No\n${suggestionsMessage}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(
        "An error occurred while checking eligibility. Please try again later."
      );
    }
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
            <FormControl id="monthlyIncome" isRequired>
              <FormLabel>Gross Monthly Income</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setGrossMonthlyIncome(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="creditScore" isRequired>
              <FormLabel>Credit Score</FormLabel>
              <NumberInput min={300} max={850}>
                <NumberInputField
                  onChange={(e) => setCreditScore(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="homeAppraisedValue" isRequired>
              <FormLabel>Appraisal Value</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setHomeAppraisedValue(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="downPaymentAmount" isRequired>
              <FormLabel>Down Payment</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setDownPaymentAmount(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="monthlyCreditCardPayment" isRequired>
              <FormLabel>Credit Card Payment</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setMonthlyCreditCardPayment(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="monthlyCarPayment" isRequired>
              <FormLabel>Car Payment</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setMonthlyCarPayment(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            <FormControl id="studentLoanPayment" isRequired>
              <FormLabel>Student Loan Payment</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setStudentLoanPayment(e.target.value)}
                />
              </NumberInput>
            </FormControl>

            {/* Added FormControl for estimated monthly mortgage payment */}
            <FormControl id="estMonthlyMortgagePayment" isRequired>
              <FormLabel>Estimated Monthly Mortgage Payment</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  onChange={(e) => setEstMonthlyMortgagePayment(e.target.value)}
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
