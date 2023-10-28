import React, { useState } from 'react';

const categories = ['Groceries', 'Rent', 'Utilities', 'Entertainment', 'Misc'];

export default function BudgetTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddExpense = () => {
    if (description && amount && category) {
      setExpenses([...expenses, { description, amount: parseFloat(amount), category }]);
      setDescription('');
      setAmount('');
      setCategory('');
    }
  };

  const handleDeleteExpense = (index) => {
    const newExpenses = expenses.slice();
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);
  };

  const handleEditExpense = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setDescription(expenses[index].description);
    setAmount(expenses[index].amount);
    setCategory(expenses[index].category);
  };

  const handleSaveEdit = () => {
    const newExpenses = expenses.slice();
    newExpenses[editIndex] = { description, amount: parseFloat(amount), category };
    setExpenses(newExpenses);
    setIsEditing(false);
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 min-h-screen">
      <div className="container mx-auto bg-white rounded-lg p-4 md:p-6 shadow-lg">
        {/* Expense Input Form */}
        <div className="flex flex-col md:flex-row mb-4">
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-2 md:mb-0 flex-grow mr-0 md:mr-2 text-black"
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={isEditing ? handleSaveEdit : handleAddExpense}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full md:w-auto"
          >
            {isEditing ? 'Save Edit' : 'Add Expense'}
          </button>
        </div>

        {/* Expense List */}
        <div>
          {expenses.map((expense, index) => (
            <div key={index} className="flex justify-between p-2 bg-white border border-gray-300 rounded-lg mb-2">
              <div>
                <span className="text-gray-700">{expense.description}</span>
                <span className="text-red-500 ml-2">${expense.amount.toFixed(2)}</span>
                <span className="text-blue-500 ml-2">{expense.category}</span>
              </div>
              <div>
                <button onClick={() => handleEditExpense(index)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => handleDeleteExpense(index)} className="text-red-500">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
