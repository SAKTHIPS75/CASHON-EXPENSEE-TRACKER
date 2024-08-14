import React from 'react';
import './TransactionList.css';
import Navbar from './Navbar';

const TransactionList = ({ transactions = [] }) => {
  if (!Array.isArray(transactions)) {
    return <p>Invalid transactions data.</p>;
  }

  return (
    <div className="transaction-list-wrapper">
      <Navbar/>
      <div className="transaction-list-content">
        <h1>Transaction List</h1>
        <ul>
          {transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            transactions.map((transaction, index) => (
              <li key={index} className={transaction.type === 'income' ? 'transaction-income' : 'transaction-expense'}>
                <p><strong>{transaction.description}</strong></p>
                <p>₹{transaction.amount.toFixed(2)} ({transaction.type})</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
