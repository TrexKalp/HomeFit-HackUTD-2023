const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fastCsv = require("fast-csv");
const fs = require("fs");
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// Function to check eligibility, extracted from your existing logic
function checkEligibility(data) {
  const income = parseFloat(data.GrossMonthlyIncome);
  const carPayment = parseFloat(data.CarPayment);
  const creditCardPayment = parseFloat(data.CreditCardPayment);
  const studentPayment = parseFloat(data.StudentLoanPayments);
  const appraisedValue = parseFloat(data.AppraisedValue);
  const downPayment = parseFloat(data.DownPayment);
  const loanAmount = parseFloat(data.LoanAmount);
  const mortgagePayment = parseFloat(data.MonthlyMortgagePayment);
  const score = parseInt(data.CreditScore, 10);

  // Your existing calculations (adjusted if necessary for consistency with your requirements)
  const LTV = (loanAmount / appraisedValue) * 100;
  const monthlyDebtPayments =
    carPayment + creditCardPayment + studentPayment + mortgagePayment;
  const DTI = (monthlyDebtPayments / income) * 100;
  const FEDTI = (mortgagePayment / income) * 100;

  let approved = score >= 640 && LTV <= 95 && DTI <= 43 && FEDTI <= 28;
  let PMI = null;
  let suggestions = [];

  if (LTV > 80) {
    PMI = (loanAmount * 0.01) / 12;
    suggestions.push("Consider the additional cost of PMI.");
  }

  if (score < 640) suggestions.push("Improve your credit score.");
  if (DTI >= 43) suggestions.push("Reduce your debt.");
  if (FEDTI > 28) suggestions.push("Look for a less expensive home.");

  return {
    approved,
    PMI,
    suggestions,
  };
}

// Function to format the response consistently for both endpoints
function formatResponse({ approved, PMI, suggestions }) {
  return {
    approved: approved ? "Yes" : "No",
    PMI:
      PMI !== null ? `Required - $${PMI.toFixed(2)} per month` : "Not Required",
    suggestions,
  };
}

app.post("/api/process-batch", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  let approvedCounter = 0;
  let declinedCounter = 0;

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(fastCsv.parse({ headers: true }))
    .on("data", (row) => {
      const result = checkEligibility(row);
      results.push(result);
      if (result.approved) {
        approvedCounter++;
      } else {
        declinedCounter++;
      }
    })
    .on("end", () => {
      fs.unlinkSync(req.file.path); // Make sure to handle errors in production
      res.json({ approved: approvedCounter, declined: declinedCounter });
    })
    .on("error", (error) => {
      console.error("Error processing the file:", error);
      res.status(500).send("Error processing the file");
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
