const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/check-eligibility", (req, res) => {
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

  const income = parseFloat(grossMonthlyIncome);
  const carPayment = parseFloat(monthlyCarPayment);
  const creditCardPayment = parseFloat(monthlyCreditCardPayment);
  const studentPayment = parseFloat(studentLoanPayment);
  const appraisedValue = parseFloat(homeAppraisedValue);
  const mortgagePayment = parseFloat(estMonthlyMortgagePayment);
  const downPayment = parseFloat(downPaymentAmount);
  const score = parseInt(creditScore, 10);
  // Correct calculation using parsed values
  const loanAmount = appraisedValue - downPayment;
  const LTV = (loanAmount / appraisedValue) * 100;

  const monthlyDebtPayments =
    carPayment + creditCardPayment + studentPayment + mortgagePayment;
  const DTI = (monthlyDebtPayments / income) * 100;
  const FEDTI = (mortgagePayment / income) * 100;

  console.log({ LTV, DTI, FEDTI, score });

  let approved = score >= 640 && LTV < 95 && DTI < 43 && FEDTI <= 28;
  let PMI = null;
  let suggestions = [];

  if (LTV >= 80 && LTV < 95) {
    PMI = (loanAmount * 0.01) / 12; // PMI calculation
  }

  if (!approved) {
    if (score < 640) suggestions.push("Improve your credit score.");
    if (LTV >= 80) {
      suggestions.push("Increase your down payment amount.");
      if (PMI) {
        suggestions.push(
          `Consider the additional cost of Private Mortgage Insurance (PMI): $${PMI.toFixed(
            2
          )} per month.`
        );
      }
    }
    if (DTI >= 43) suggestions.push("Pay off some current debt.");
    if (FEDTI > 28) suggestions.push("Look for a less expensive home.");
  }

  res.json({
    approved: approved ? "Yes" : "No",
    PMI: PMI ? `Required - $${PMI.toFixed(2)} per month` : "Not Required",
    suggestions,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
