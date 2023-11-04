const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001; // or another port that you prefer
const mongoose=require('mongoose')
const url = `mongodb+srv://root:rootroot@eag.z6jqmoe.mongodb.net/train_data?retryWrites=true&w=majority`;
const CustomerData = require('../modals/TaskModel');
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
    app.get("/dogs", async (req, res) => {
      const allDogs = await CustomerData.find({});
      return res.status(200).json(allDogs);
    });

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
