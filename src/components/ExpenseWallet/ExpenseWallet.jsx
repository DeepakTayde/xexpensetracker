import React, { useState } from "react";
import styles from "./ExpenseWallet.module.css";
import AddIncomeModal from "../Modal/AddIncomeModal";
import AddExpensesModal from "../Modal/AddExpensesModal";
import { enqueueSnackbar } from "notistack";

const ExpenseWallet = ({
  walletBalance,
  setWalletBalance,
  expenses,
  setExpenses,
}) => {
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.price || 0),
    0
  );

  const handleAddIncome = (amount, e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      enqueueSnackbar("Please enter a valid income amount.", {
        variant: "warning",
      });
      return;
    } else {
      setWalletBalance((prevBalance) => prevBalance + parseFloat(amount));
      setIsIncomeOpen(!isIncomeOpen);
      enqueueSnackbar("Income added successfully!", {
        variant: "success",
      });
    }
  };

  const handleAddExpense = (newExpense) => {
    if (newExpense.price >= walletBalance) {
      enqueueSnackbar("You don't have enough balance to add this expense!", {
        variant: "error",
      });
      return;
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      setWalletBalance((prevBalance) => prevBalance - Number(newExpense.price));
      enqueueSnackbar("Expense added successfully!", {
        variant: "success",
      });
    }
  };

  return (
    <div className={styles.expenseWallet}>
      <div className={styles.walletCard}>
        <h2>
          Wallet Balance:{" "}
          <span className={styles.walletBalance}>₹{walletBalance}</span>
        </h2>
        <button
          button="button"
          className={styles.addIncomeBtn}
          onClick={() => setIsIncomeOpen(!isIncomeOpen)}
        >
          + Add Income
        </button>
        <AddIncomeModal
          isOpen={isIncomeOpen}
          setIsOpen={setIsIncomeOpen}
          onHandleIncome={handleAddIncome}
        />
      </div>
      <div className={styles.walletCard}>
        <h2>
          Expenses:{" "}
          <span className={styles.expenseBalance}>₹{totalExpenses}</span>
        </h2>
        <button
          className={styles.addExpenseBtn}
          onClick={() => setIsExpenseOpen(!isExpenseOpen)}
        >
          + Add Expense
        </button>
        <AddExpensesModal
          handleExpense={handleAddExpense}
          isOpen={isExpenseOpen}
          setIsOpen={setIsExpenseOpen}
        />
      </div>
    </div>
  );
};

export default ExpenseWallet;
