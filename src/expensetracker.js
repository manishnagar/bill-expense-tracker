import React from 'react'
import { useState } from 'react';
function ExpenseTracker() {
    const [expenses, setExpenses] = useState([]); // State to hold expenses
    const [formData, setFormData] = useState({
        date: "",
        name: "",
        amount: "",
        category: "food",
    });

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${day}-${month}-${year}`;
    };


    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "expense-amount") {
            const numberValue = Math.max(1, Math.min(1000000, value)); 
            setFormData({ ...formData, amount: numberValue });
        } else {
            setFormData({ ...formData, [id.replace("expense-", "")]: value });
        }
    };
    // Add expense to the list
    const handleAddExpense = (e) => {
        e.preventDefault();

        if (formData.date && formData.name && formData.amount) {
            setExpenses([...expenses, formData]);

            setFormData({
                date: "",
                name: "",
                amount: "",
                category: "food",
            }); // Reset form
        }
    };


    // Clear all expenses
    const handleClearExpenses = (e) => {
        e.preventDefault();
        setExpenses([]);
    };

    const handleHideExpense = (index) => {
        setExpenses(
            expenses.map((expense, i) =>
                i === index ? { ...expense, hidden: true } : expense
            )
        );
    };
    return (
        <div>
            <form id="expense-form">
                <div className='row'>
                    <div className="col-sm-12">
                        <label for="expense-date">Expense Date:</label>
                        <input type="date" className="form-control" id="expense-date" value={formData.date} onChange={handleInputChange} max={getTodayDate()} placeholder="Enter Date of expense" required />

                        <label for="expense-name">Expense Name:</label>
                        <input type="text" className="form-control" id="expense-name" value={formData.name}
                            onChange={handleInputChange} placeholder="Enter Expense" required
                        />
                        <label for="expense-amount">Expense Amount:</label>
                        <input type="number" className="form-control" id="expense-amount" value={formData.amount}
                            onChange={handleInputChange} placeholder="Enter Expense amount" required
                        />
                        <label for="item">Expense item:</label>
                        <select class="form-select" id="expense-category" value={formData.category}
                            onChange={handleInputChange}>
                            <option value="food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Grocerry">Grocerry</option>
                            <option value="Other Utilities">Other Utilities</option>
                        </select>



                        <div>
                            {expenses.map((expense, index) => !expense.hidden ?
                                (
                                    <div className="expense-card" key={index}>
                                        <div className="expense-card-flex">
                                            <div className="date">{new Date(expense.date).toLocaleDateString("en-GB")}</div>
                                            <div className="expense-name">
                                                {expense.name} <span className='date'>({expense.category})</span>
                                            </div>
                                            <div className="expense-name">₹ {expense.amount}</div>
                                        </div>

                                        <div
                                            className="close"
                                            onClick={() => handleHideExpense(index)}
                                            style={{ cursor: "pointer", color: "red" }}
                                        >
                                            ✖
                                        </div>

                                    </div>

                                ) : null)}

                        </div>


                        <div className="Total-amt" id="total-expenses">
                            Total Amount: ₹{" "}
                            {expenses
                                .filter((expense) => !expense.hidden)
                                .reduce((total, expense) => total + parseFloat(expense.amount), 0)}
                        </div>

                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <button
                            type="submit"
                            className="btn btn-success btn-pad" onClick={handleAddExpense}>Add Expenses</button>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <button
                            type="submit"
                            className="btn btn-danger btn-pad" id="clear-btn" onClick={handleClearExpenses}>Clear Expenses</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ExpenseTracker;