import React, { useState } from "react";
import {
  PiPenLight,
  PiXCircleLight,
} from "react-icons/pi";
import { categories } from "../../constants/categories";
import styles from "./TransactionCard.module.css";
import AddExpensesModal from "../Modal/AddExpensesModal";

const TransactionCard = ({ handleDelete, expenses , setExpenses}) => {
    const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  
  const handleEditExpense= (e)=>{
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
                    <button type="button" className={styles.transactionEditBtn} onClick={setIsExpenseOpen(!isExpenseOpen)}>
                      <PiPenLight className={styles.iconsStyle} title="Edit" />
                    </button>
                    <AddExpensesModal handleExpense={handleEditExpense} isOpen={isExpenseOpen} setIsOpen={setIsExpenseOpen} />

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
