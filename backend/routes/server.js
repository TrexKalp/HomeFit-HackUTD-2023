const express = require("express");
// import express from "express";
const cors = require("cors");
const multer = require("multer");
const fastCsv = require("fast-csv");
const fs = require("fs");
const app = express();
const upload = multer({ dest: "uploads/" });
// const mongoose = require("mongoose");
const path = require("path");
const CustomerData = require("../modals/LoanDataModel.js");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Database connection parameters
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

//Replace with your actual MongoDB connection string
const url = `mongodb+srv://root:rootroot@eag.z6jqmoe.mongodb.net/train_data?retryWrites=true&w=majority`;

// mongoose
//   .connect(url, connectionParams)
//   .then(() => console.log("Connected to the database"))
//   .catch((err) => console.error(`Error connecting to the database.\n${err}`));

// const getFieldData = async (fields) => {
//   const projection = {};
//   for (let i = 0; i < fields.length; i++) {
//     projection[fields[i]] = 1;
//   }
//   const data = await CustomerData.find({}, projection);
//   return data;
// };

app.use(cors());
app.use(express.json());
// Function to check eligibility, extracted from your existing logic
async function checkEligibility(data) {
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
  const LTV = (appraisedValue - downPayment / appraisedValue) * 100;
  const monthlyDebtPayments =
    carPayment + creditCardPayment + studentPayment + mortgagePayment;
  const DTI = (monthlyDebtPayments / income) * 100;
  const FEDTI = (mortgagePayment / income) * 100;

  let approved = score >= 640 && LTV <= 95 && DTI <= 43 && FEDTI <= 28;
  let PMI = null;
  let suggestions = [];
  let fields = [];

  if (LTV > 80) {
    PMI = (loanAmount * 0.01) / 12;
    suggestions.push("Consider the additional cost of PMI.");
    fields.push("LTV");
  }

  if (score < 640) {
    suggestions.push("Improve your credit score.");
    fields.push("CreditScore");
  }
  if (DTI >= 43) {
    suggestions.push("Reduce your debt.");
    fields.push("DTI");
  }
  if (FEDTI > 28) {
    suggestions.push("Look for a less expensive home.");
    fields.push("FEDTI");
  }

  return {
    approved,
    PMI,
    suggestions,
  };
}

app.get("/get-csv", (req, res) => {
  const filePath = path.join(__dirname, "eligibility_data.csv"); // Ensure this is the correct path to your CSV file

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading the CSV file.");
    } else {
      res.setHeader("Content-Type", "text/csv");
      res.send(data);
    }
  });
});

app.get("/download-csv", (req, res) => {
  const filePath = path.join(__dirname, "eligibility_data.csv"); // Ensure the file path is correct

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading the CSV file.");
    } else {
      // Set headers to prompt the file download
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=eligibility_data.csv"
      );
      res.setHeader("Content-Type", "text/csv");
      res.send(data);
    }
  });
});

// // Function to format the response consistently for both endpoints
// function formatResponse({ approved, PMI, suggestions }) {
//   return {
//     approved: approved ? "Yes" : "No",
//     PMI:
//       PMI !== null ? `Required - $${PMI.toFixed(2)} per month` : "Not Required",
//     suggestions,
//   };
// }

const getGPTPrompts = async (prompt) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
  });
  const resp1 = completion.data.choices[0].message.content;
  return resp1;
};

app.post("/api/process-batch", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  let approvedCounter = 0;
  let declinedCounter = 0;

  // Define the path for the new CSV file
  const newCsvPath = path.join(__dirname, "eligibility_data.csv");

  // Read and process the uploaded CSV file
  fs.createReadStream(req.file.path)
    .pipe(fastCsv.parse({ headers: true }))
    .on("data", (row) => {
      const result = checkEligibility(row);
      if (result.approved) {
        approvedCounter++;
      } else {
        declinedCounter++;
      }
    })
    .on("end", () => {
      // Remove the old CSV and replace it with the uploaded one
      try {
        if (fs.existsSync(newCsvPath)) {
          fs.unlinkSync(newCsvPath);
        }
        fs.renameSync(req.file.path, newCsvPath);
        res.json({ approved: approvedCounter, declined: declinedCounter });
      } catch (error) {
        console.error("Error replacing the CSV file:", error);
        res.status(500).send("Error replacing the file");
      }
    })
    .on("error", (error) => {
      console.error("Error processing the file:", error);
      res.status(500).send("Error processing the file");
    });
});

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Define the CSV Writer with path and headers
const csvWriter = createCsvWriter({
  path: "eligibility_data.csv",
  header: [
    { id: "grossMonthlyIncome", title: "GROSS_MONTHLY_INCOME" },
    { id: "monthlyCarPayment", title: "MONTHLY_CAR_PAYMENT" },
    { id: "monthlyCreditCardPayment", title: "MONTHLY_CREDIT_CARD_PAYMENT" },
    { id: "studentLoanPayment", title: "STUDENT_LOAN_PAYMENT" },
    { id: "homeAppraisedValue", title: "HOME_APPRAISED_VALUE" },
    { id: "estMonthlyMortgagePayment", title: "EST_MONTHLY_MORTGAGE_PAYMENT" },
    { id: "downPaymentAmount", title: "DOWN_PAYMENT_AMOUNT" },
    { id: "creditScore", title: "CREDIT_SCORE" },
    { id: "approved", title: "APPROVED" },
    { id: "PMI", title: "PMI" },
  ],
});

// Track the number of approved and not approved applications
let approvalStatistics = {
  approvedCount: 0,
  notApprovedCount: 0,
};

app.post("/api/check-eligibility", async (req, res) => {
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

  let approved = score >= 640 && LTV < 95 && DTI < 43 && FEDTI <= 28;
  let PMI = null;
  let suggestions = [];
  let fields = [];

  if (LTV >= 80 && LTV < 95) {
    PMI = (loanAmount * 0.01) / 12; // PMI calculation
  }

  if (!approved) {
    if (score < 640) {
      suggestions.push("Improve your credit score.");
      fields.push("score");
    }
    if (LTV >= 80) {
      suggestions.push("Increase your down payment amount.");
      fields.push("LTV");
      if (PMI) {
        suggestions.push(
          `Consider the additional cost of Private Mortgage Insurance (PMI): $${PMI.toFixed(
            2
          )} per month.`
        );
      }
    }
    if (DTI >= 43) suggestions.push("Pay off some current debt.");
    fields.push("DTI");
    if (FEDTI > 28) suggestions.push("Look for a less expensive home.");
    fields.push("FEDTI");
  }
  // let filteredData = null;
  // Now, increment counters based on the approval status
  if (approved) {
    approvalStatistics.approvedCount++;
  } else {
    approvalStatistics.notApprovedCount++;
    // filteredData = await getFieldData(fields);
  }

  // Prepare data for the CSV file
  const csvData = {
    grossMonthlyIncome: grossMonthlyIncome,
    monthlyCarPayment: monthlyCarPayment,
    monthlyCreditCardPayment: monthlyCreditCardPayment,
    studentLoanPayment: studentLoanPayment,
    homeAppraisedValue: homeAppraisedValue,
    estMonthlyMortgagePayment: estMonthlyMortgagePayment,
    downPaymentAmount: downPaymentAmount,
    creditScore: creditScore,
    approved: approved ? "Yes" : "No",
    PMI: PMI ? PMI.toFixed(2) : "0.00",
  };

  try {
    // Write the applicant's data to the CSV file
    await csvWriter.writeRecords([csvData]);

    // Respond with approval results and current statistics for approvals
    res.json({
      approved: approved ? "Yes" : "No",
      PMI: PMI ? `Required - $${PMI.toFixed(2)} per month` : "Not Required",
      suggestions: suggestions,
      statistics: approvalStatistics,
      problemfields: fields,
    });
  } catch (error) {
    // If an error occurs, send a 500 server error response
    res.status(500).json({
      message: "Error writing to CSV",
      error: error.message,
    });
  }
});

app.get("/api/approval-counts", (req, res) => {
  let approvedCount = 0;
  let notApprovedCount = 0;

  fs.createReadStream("eligibility_data.csv")
    .pipe(fastCsv.parse({ headers: true }))
    .on("data", (row) => {
      if (row.APPROVED === "Yes") {
        approvedCount++;
      } else {
        notApprovedCount++;
      }
    })
    .on("end", () => {
      res.json({ approved: approvedCount, notApproved: notApprovedCount });
    })
    .on("error", (error) => {
      console.error("Error reading the CSV file:", error);
      res.status(500).send("Error reading the CSV file");
    });
});

app.get("/api/suggestions", async (req, res) => {
  const prompt = req.query.prompt;
  const responses = await getGPTPrompts(prompt);
  res.json({
    response: responses,
  });
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;
  const targetPath = path.join(__dirname, "eligibility_data.csv");

  fs.readFile(filePath, (readError, data) => {
    if (readError) {
      return res.status(500).send("Error reading the uploaded file.");
    }

    fs.writeFile(targetPath, data, (writeError) => {
      if (writeError) {
        return res.status(500).send("Error overwriting the CSV file.");
      }

      // Clean up the uploaded file
      fs.unlink(filePath, (unlinkError) => {
        if (unlinkError) {
          console.error(`Error removing the temporary file: ${unlinkError}`);
          // Not sending a response error here because the main operation succeeded
        }
        res.send("File uploaded and processed successfully.");
      });
    });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
