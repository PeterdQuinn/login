import React, { useState } from 'react';

export default function BudgetTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = () => {
    if (description && amount) {
      setExpenses([...expenses, { description, amount: parseFloat(amount) }]);
      setDescription('');
      setAmount('');
    }
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 min-h-screen">
      <div className="container mx-auto bg-white rounded-lg p-4 md:p-6 shadow-lg">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-700 text-center">Budget Tracker</h1>
        </header>
        <main className="mb-8">
        <div className="mb-4 flex flex-col md:flex-row items-center">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-2 md:mb-0 flex-grow mr-0 md:mr-2 text-black"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-2 md:mb-0 flex-grow mr-0 md:mr-2 text-black"
            />
            <button onClick={handleAddExpense} className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full md:w-auto">Add Expense</button>
          </div>
          <div className="expense-list">
            {expenses.map((expense, index) => (
              <div key={index} className="flex justify-between p-2 bg-white border border-gray-300 rounded-lg mb-2">
                <span className="text-gray-700">{expense.description}</span>
                <span className="text-red-500">${expense.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </main>
        <footer>
          <p className="text-gray-700 text-center">
            Total Expenses: $
            {expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}
          </p>
        </footer>
      </div>
    </div>
  );
}
