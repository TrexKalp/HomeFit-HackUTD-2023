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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
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

    const minimumDownPaymentRequired = homeAppraisedValue * 0.2; // 20% of home value
    if (downPaymentAmount < minimumDownPaymentRequired) {
      alert(`Your down payment must be at least ${minimumDownPaymentRequired}`);
      return false;
    }

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
            {/* Slider for Gross Monthly Income */}
            <FormControl id="monthlyIncome" isRequired>
              <FormLabel>Gross Monthly Income: ${grossMonthlyIncome}</FormLabel>
              <Slider
                min={1000}
                max={20000}
                step={500}
                value={grossMonthlyIncome}
                onChange={setGrossMonthlyIncome}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            {/* Slider for Credit Score */}
            <FormControl id="creditScore" isRequired>
              <FormLabel>Credit Score: {creditScore}</FormLabel>
              <Slider
                min={300}
                max={850}
                step={10}
                value={creditScore}
                onChange={setCreditScore}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            {/* Slider for Home Appraised Value */}
            <FormControl id="homeAppraisedValue" isRequired>
              <FormLabel>Home Appraised Value: ${homeAppraisedValue}</FormLabel>
              <Slider
                min={50000}
                max={2000000}
                step={5000}
                value={homeAppraisedValue}
                onChange={setHomeAppraisedValue}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            {/* Slider for Down Payment Amount */}
            <FormControl id="downPaymentAmount" isRequired>
              <FormLabel>Down Payment Amount: ${downPaymentAmount}</FormLabel>
              <Slider
                min={0}
                max={1000000}
                step={1000}
                value={downPaymentAmount}
                onChange={setDownPaymentAmount}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            {/* Slider for Monthly Credit Card Payment */}
            <FormControl id="monthlyCreditCardPayment" isRequired>
              <FormLabel>
                Monthly Credit Card Payment: ${monthlyCreditCardPayment}
              </FormLabel>
              <Slider
                min={0}
                max={10000}
                step={100}
                value={monthlyCreditCardPayment}
                onChange={setMonthlyCreditCardPayment}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            {/* Slider for Monthly Car Payment */}
            <FormControl id="monthlyCarPayment" isRequired>
              <FormLabel>Monthly Car Payment: ${monthlyCarPayment}</FormLabel>
              <Slider
                min={0}
                max={10000}
                step={100}
                value={monthlyCarPayment}
                onChange={setMonthlyCarPayment}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            {/* Slider for Student Loan Payment */}
            <FormControl id="studentLoanPayment" isRequired>
              <FormLabel>Student Loan Payment: ${studentLoanPayment}</FormLabel>
              <Slider
                min={0}
                max={10000}
                step={100}
                value={studentLoanPayment}
                onChange={setStudentLoanPayment}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            {/* Slider for Estimated Monthly Mortgage Payment */}
            <FormControl id="estMonthlyMortgagePayment" isRequired>
              <FormLabel>
                Estimated Monthly Mortgage Payment: ${estMonthlyMortgagePayment}
              </FormLabel>
              <Slider
                min={0}
                max={10000}
                step={100}
                value={estMonthlyMortgagePayment}
                onChange={setEstMonthlyMortgagePayment}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
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
