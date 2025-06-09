import React, { useEffect, useState } from "react";
import {
  PiPenLight,
  PiXCircleLight,
} from "react-icons/pi";
import { categories } from "../../constants/categories";
import styles from "./TransactionCard.module.css";
import AddExpensesModal from "../Modal/AddExpensesModal";

const TransactionCard = ({ setWalletBalance, handleDelete, expenses , setExpenses}) => {
    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
    const [editingExpense, setEditingExpense]=useState(null)
  
  const handleEditExpense = ( updatedExpense ) => {
    const updatedExpenses = expenses.map((expense)=>{
      if(expense.id === updatedExpense.id){
        return updatedExpense;
      }
      return expense;
    });

    const prevExpense = expenses.find((expense)=> expense.id === updatedExpense.id)
    const expenseDifference = prevExpense.price - Number(updatedExpense.price)

    setExpenses(updatedExpenses);
    setEditingExpense(null);
    setIsExpenseOpen(!isExpenseOpen)

    if(expenseDifference !== 0){
      setWalletBalance((prev) => prev + expenseDifference)
    }

  }


  return (
    <div className={styles.transactionCard}>
      <h2>Recent Transactions</h2>
      <div className={styles.transactionListContainer}>
        <ul className={styles.transactionList}>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <li key={expense.id} className={styles.transactionListItem}>
                <div className={styles.transactionInfoLeft}>
                  <span className={styles.transactionIcon}>
                    {(() => {
                      const Icon = categories.find(
                        (category) => category.name.toLowerCase() === expense.category.toLowerCase()
                      )?.icon;
                      return Icon ? (
                        <Icon className={styles.iconsStyle} />
                      ) : null;
                    })()}
                  </span>
                  <span className={styles.transactionDetails}>
                    <h3 className={styles.transactionName}>{expense.title}</h3>
                    <h4 className={styles.transactionDate}>{expense.date}</h4>
                  </span>
                </div>
                <div className={styles.transactionInfoRight}>
                  <span className={styles.transactionAmount}>
                    ₹{expense.price}
                  </span>
                  <div className={styles.transactionActions}>
                    <button type="button" onClick={() =>handleDelete(expense.id, expense.price)} className={styles.transactionDeleteBtn}>
                      <PiXCircleLight className={styles.iconsStyle} title="Delete" />
                    </button>
                    <button type="button" className={styles.transactionEditBtn} onClick={()=>{
                      setEditingExpense(expense)
                      setIsExpenseOpen(true)}}>
                      <PiPenLight className={styles.iconsStyle} title="Edit" />
                    </button>
                    <AddExpensesModal editingExpense={editingExpense} handleExpense={handleEditExpense} isOpen={isExpenseOpen} setIsOpen={setIsExpenseOpen} />

                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className={styles.noTransactions}>No transactions!</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransactionCard;
