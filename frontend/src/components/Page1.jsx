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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Spinner,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";

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

  const [alertInfo, setAlertInfo] = useState({ status: "", message: "" });
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [advice, setAdvice] = useState(""); // State to store the user advice
  const [isLoading, setIsLoading] = useState(false);

  const getFinancialAdvice = async (prompt) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3001/api/suggestions",
        {
          params: {
            prompt: prompt,
          },
        }
      );
      addAlert("info", `${response.data.response}`);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  // Function to add a new alert to the stack
  // Function to add a new alert to the stack, removing the first one if the max is reached
  const addAlert = (status, message) => {
    setAlerts((currentAlerts) => {
      const updatedAlerts =
        currentAlerts.length >= 2
          ? [...currentAlerts.slice(1), { status, message }]
          : [...currentAlerts, { status, message }];

      // Save to localStorage
      localStorage.setItem("alerts", JSON.stringify(updatedAlerts));
      return updatedAlerts;
    });
  };

  useEffect(() => {
    // Load saved alerts from localStorage when the component mounts
    const savedAlerts = localStorage.getItem("alerts");
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  // Function to remove an alert from the stack
  const removeAlert = (index) => {
    setAlerts((currentAlerts) => currentAlerts.filter((_, i) => i !== index));
  };

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

    const showAlert = (status, message) => {
      setAlertInfo({ status, message });
      setIsAlertVisible(true);
    };

    const minimumDownPaymentRequired = homeAppraisedValue * 0.2; // 20% of home value
    if (downPaymentAmount < minimumDownPaymentRequired) {
      showAlert(
        "error",
        `Your down payment must be at least ${minimumDownPaymentRequired}`
      );
      return;
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
        addAlert("success", "Congratulations! You are eligible to buy a home.");
      } else {
        const suggestionsMessage =
          data.suggestions.length > 0
            ? `Suggestions: ${data.suggestions.join(", ")}`
            : "No suggestions available.";
        addAlert("info", `Eligibility Check: Failed. \n ${suggestionsMessage}`);

        let prompt = `I have issues with ${data.problemfields.join(
          ", "
        )}. Please tell me how I can fix these issues. Limit reponse to 130 words`;
        console.log(prompt);
        await getFinancialAdvice(prompt);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      addAlert(
        "error",
        "An error occurred while checking eligibility. Please try again later."
      );
    }
  };

  return (
    <Flex minH={"80vh"} align={"center"} justify={"center"} py={4} px={4}>
      <Stack spacing={8} mx={"auto"} maxW={"xxl"} maxH={"xxxl"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Are you ready to buy a home? Let's Check!
          </Heading>
        </Stack>
        <Box
          rounded={"xxl"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} maxH={"xxl"}>
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
      {isLoading ? (
        <Spinner size="xl" mr={10} />
      ) : (
        <Flex
          direction="column"
          width={{ base: "100%", md: "auto" }}
          // ml={{ md: 4 }}
          // mt={{ base: 4, md: 0 }}
          // position="fixed" // Fixed position to stack on the right
          right="10px" // Right-aligned
          top="10px" // Starting from the top
          maxW={"450px"} // Take up the full width on mobile, but only 400px on larger screens
        >
          {alerts.map((alert, index) => (
            <Alert
              key={index}
              status={alert.status}
              borderRadius="md"
              mb={2} // Margin bottom for spacing between alerts
              zIndex="overlay" // Ensures it's above other content
            >
              <AlertIcon />
              <Box flex="1">
                <AlertTitle mr={2}>
                  {alert.status === "error" ? "Error" : "Eligibility Check"}
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Box>
              {/* <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => removeAlert(index)}
            /> */}
            </Alert>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
