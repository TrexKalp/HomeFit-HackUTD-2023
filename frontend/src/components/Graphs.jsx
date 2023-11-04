import React from "react";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const sampleData = [
  {
    ID: 1,
    GrossMonthlyIncome: 3103.0,
    CreditCardPayment: 317.0,
    CarPayment: 374.0,
    StudentLoanPayments: 250.0,
    AppraisedValue: 268468.0,
    DownPayment: 32216.16,
    LoanAmount: 236251.84,
    MonthlyMortgagePayment: 1127.9,
    CreditScore: 778,
  },
  {
    ID: 2,
    GrossMonthlyIncome: 2939.0,
    CreditCardPayment: 368.0,
    CarPayment: 395.0,
    StudentLoanPayments: 228.0,
    AppraisedValue: 335467.0,
    DownPayment: 30192.03,
    LoanAmount: 305274.97,
    MonthlyMortgagePayment: 2240.0,
    CreditScore: 546,
  },
  {
    ID: 3,
    GrossMonthlyIncome: 4676.0,
    CreditCardPayment: 222.0,
    CarPayment: 352.0,
    StudentLoanPayments: 368.0,
    AppraisedValue: 461177.0,
    DownPayment: 36894.16,
    LoanAmount: 424282.84,
    MonthlyMortgagePayment: 2277.64,
    CreditScore: 736,
  },
  // ... other data entries ...
  {
    ID: 48,
    GrossMonthlyIncome: 4701.0,
    CreditCardPayment: 420.0,
    CarPayment: 434.0,
    StudentLoanPayments: 210.0,
    AppraisedValue: 341408.0,
    DownPayment: 30726.72,
    LoanAmount: 310681.28,
    MonthlyMortgagePayment: 1483.24,
    CreditScore: 766,
  },
  {
    ID: 49,
    GrossMonthlyIncome: 7641.0,
    CreditCardPayment: 340.0,
    CarPayment: 469.0,
    StudentLoanPayments: 286.0,
    AppraisedValue: 291836.0,
    DownPayment: 26265.24,
    LoanAmount: 265570.76,
    MonthlyMortgagePayment: 1948.66,
    CreditScore: 541,
  },
  // ... add more sample data as needed
];

const Graphs = () => {
  const data = {
    labels: sampleData.map((data) => `ID ${data.ID}`),
    datasets: [
      {
        type: "bar",
        label: "Credit Score",
        data: sampleData.map((data) => data.CreditScore),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 0.8)",
        yAxisID: "y-axis-1",
      },
      {
        type: "line",
        label: "Loan Amount",
        data: sampleData.map((data) => data.LoanAmount),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 0.8)",
        yAxisID: "y-axis-2",
      },
    ],
  };

  const options = {
    scales: {
      "y-axis-1": {
        type: "linear",
        display: true,
        position: "left",
      },
      "y-axis-2": {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div>
      <h2>Credit Score and Loan Amount Comparison</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graphs;
