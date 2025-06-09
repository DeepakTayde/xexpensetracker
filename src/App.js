
import "./App.css";
import ExpenseTrackerPieChart from "./components/PieChart/ExpenseTrackerPieChart";

import ExpenseTrendsCard from "./components/ExpenseTrendsCard/ExpenseTrendsCard";
import ExpenseWallet from "./components/ExpenseWallet/ExpenseWallet";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import TransactionCard from "./components/TransactionCard/TransactionCard.jsx";



function App() {
  const [expenses, setExpenses] = useState(()=>{
    const storedData = localStorage.getItem("expenses");
    return storedData ? JSON.parse(storedData) : [];
  });

    const [walletBalance, setWalletBalance] = useState(() => {
      const storedBalance = localStorage.getItem("walletBalance");
      return storedBalance ? parseFloat(storedBalance) : 5000;
    });

  const handleDelete=(id, price)=>{
    const updatedExpenses = expenses.filter((expense)=> expense.id!==id);
    setExpenses(updatedExpenses);
    setWalletBalance((prevBalance)=> prevBalance + Number(price))


    enqueueSnackbar("Expense deleted successfully!", {  
      variant: "success",
    });
  }


  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance);
  }, [walletBalance]);


useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="wallet-header">
        <ExpenseWallet walletBalance={walletBalance} setWalletBalance={setWalletBalance} expenses={expenses} setExpenses={setExpenses}  />
        <div className="expense-summery">
          <ExpenseTrackerPieChart expenses={expenses} />
          <div className="chart-legend">
            <span>
              <span
                className="legend-bar"
                style={{ background: "#A000FF" }}
              ></span>
              Food
            </span>
            <span>
              <span
                className="legend-bar"
                style={{ background: "#FF9304" }}
              ></span>
              Entertainment
            </span>
            <span>
              <span
                className="legend-bar"
                style={{ background: "#FDE006" }}
              ></span>
              Travel
            </span>
          </div>
        </div>
      </div>

      <div className="info-matrix">
        <TransactionCard setWalletBalance={setWalletBalance} handleDelete={handleDelete} expenses={expenses} setExpenses={setExpenses}/>
        <ExpenseTrendsCard />
      </div>
    </div>
  );
}

export default App;
