const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/check-eligibility", (req, res) => {
  // Parse numbers to ensure the correct data types are being used for calculations
  const {
    grossMonthlyIncome,
    monthlyCarPayment,
    monthlyCreditCardPayment,
    studentLoanPayment,
    homeAppraisedValue,
    estMonthlyMortgagePayment,
    downPaymentAmount,
    creditScore,
  } = req.body;

  // Parsing strings to numbers if necessary
  const income = parseFloat(grossMonthlyIncome);
  const carPayment = parseFloat(monthlyCarPayment);
  const creditCardPayment = parseFloat(monthlyCreditCardPayment);
  const studentPayment = parseFloat(studentLoanPayment);
  const appraisedValue = parseFloat(homeAppraisedValue);
  const mortgagePayment = parseFloat(estMonthlyMortgagePayment);
  const downPayment = parseFloat(downPaymentAmount);
  const score = parseInt(creditScore, 10);

  // Calculate the LTV, DTI, and FEDTI ratios
  const loanAmount = appraisedValue - downPayment;
  const LTV = (loanAmount / appraisedValue) * 100;
  const monthlyDebtPayments =
    carPayment + creditCardPayment + studentPayment + mortgagePayment;
  const DTI = (monthlyDebtPayments / income) * 100;
  const FEDTI = (mortgagePayment / income) * 100;

  // Log the ratios for debugging
  console.log({ LTV, DTI, FEDTI, score });

  // Check if the buyer meets the approval criteria
  let approved = score >= 640 && LTV < 80 && DTI < 43 && FEDTI <= 28;
  let suggestions = [];

  // If not approved, provide suggestions
  if (!approved) {
    if (score < 640) suggestions.push("Improve your credit score.");
    if (LTV >= 80) suggestions.push("Increase your down payment amount.");
    if (DTI >= 43) suggestions.push("Pay off some current debt.");
    if (FEDTI > 28) suggestions.push("Look for a less expensive home.");
  }

  // Respond with the decision and suggestions
  res.json({
    approved: approved ? "Yes" : "No",
    suggestions,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
