const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001; // or another port that you prefer

app.use(cors()); // Use cors middleware to allow cross-origin requests
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON bodies

// This is the route that will handle the POST request from the React frontend
app.post("/api/check-eligibility", (req, res) => {
  const {
    monthlyIncome,
    creditScore,
    appraisalValue,
    downPayment,
    creditCardPayment,
    carPayment,
  } = req.body;

  // Here you would include the logic to determine if the user is eligible
  // For demonstration purposes, I'm returning a simple 'Approved' or 'Not Approved'
  let result = "Not Approved";
  const monthlyDebt = parseFloat(creditCardPayment) + parseFloat(carPayment);
  const ltv =
    (parseFloat(appraisalValue) - parseFloat(downPayment)) /
    parseFloat(appraisalValue);
  const dti = (monthlyDebt / parseFloat(monthlyIncome)) * 100;
  const fedti =
    (parseFloat(req.body.mortgage) / parseFloat(monthlyIncome)) * 100;

  // Check if all criteria are met
  if (creditScore >= 640 && ltv < 0.8 && dti < 43 && fedti <= 28) {
    result = "Approved";
  }

  // Respond to the POST request with the result
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
