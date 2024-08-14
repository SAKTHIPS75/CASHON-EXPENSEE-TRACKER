import React, { useState } from 'react';
import './AddTransaction.css';
import Navbar from './Navbar';
const AddTransaction = ({ addTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income'); // Default type

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description.trim() === '' || isNaN(amount) || amount <= 0) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, amount: parseFloat(amount), type }),
      });

      if (response.ok) {
        const newTransaction = await response.json();
        addTransaction(newTransaction);
        setDescription('');
        setAmount('');
        setType('income'); // Reset type to default
      } else {
        console.error('Error adding transaction');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-transaction-container">
       <Navbar/>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter transaction description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
