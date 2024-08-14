import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import Navbar from './Navbar';
import './Dashboard.css'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ transactions, income, expenses, balance }) => {
  // Group transactions by category for pie chart
  const categories = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const categoryLabels = Object.keys(categories);
  const categoryData = Object.values(categories);

  // Data for income and expense overview
  const barData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categoryData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Expenses color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for monthly income trends
  const monthlyIncome = [income, income * 1.2, income * 1.5, income * 1.8, income * 1.6];
  const monthlyExpenses = [expenses, expenses * 1.1, expenses * 1.2, expenses * 1.3, expenses * 1.1];

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May','June','July','Auguest','September','October','December'],
    datasets: [
      {
        label: 'Monthly Income',
        data: monthlyIncome,
        borderColor: 'rgba(0, 204, 102, 1)',
        backgroundColor: 'rgba(0, 204, 102, 0.2)',
        fill: true,
      },
      {
        label: 'Monthly Expenses',
        data: monthlyExpenses,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  // Data for spending categories
  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Expense Categories',
        data: categoryData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  // Data for account balance over the months
  const doughnutData = {
    labels: ['Savings', 'Investments', 'Checking'],
    datasets: [
      {
        label: 'Account Balance Breakdown',
        data: [1500, 2000, 2500], // Example data, adjust as needed
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  // Chart options
  const pieOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Expense Categories',
      },
    },
  };

  const doughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Account Balance Breakdown',
      },
    },
  };

  return (
    <div>

      <div className="dashboard-layout">
        <Navbar/>
        <div className="dashboard-container">
          <div className="card-container">
            <div className="card" id="total-income">
              <h3>Total Income</h3>
              <p>₹{income}</p>
            </div>
            <div className="card" id="total-expenses">
              <h3>Total Expenses</h3>
              <p>₹{expenses}</p>
            </div>
            <div className="card" id="current-balance">
              <h3>Current Balance</h3>
              <p>₹{balance}</p>
            </div>
            <div className="card" id="savings-goal">
              <h3>Savings Goal</h3>
              <p>₹{balance}</p> {/* Example placeholder for savings goal */}
            </div>
          </div>
          <div className="charts-container">
            <div className="chart">
              <Bar data={barData} />
            </div>
            <div className="chart">
              <Line data={lineData} />
            </div>
          </div>
          <div className="charts-container">
            <div className="chart">
              <Pie data={pieData} options={pieOptions} />
            </div>
            <div className="chart">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
