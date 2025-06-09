import React, { useEffect, useState } from "react";
import styles from "./AddExpensesModal.module.css";
import ReactModal from "react-modal";
import { categories } from "../../constants/categories";


const AddExpensesModal = ({editingExpense, handleExpense, isOpen, setIsOpen }) => {
  const [title, setTitle]=useState("");
  const [price, setPrice]=useState("");
  const [category, setCategory]=useState("");
  const [date, setDate]=useState("");


useEffect(()=>{
  if(editingExpense){
    setTitle(editingExpense.title);
    setPrice(editingExpense.price);
    setCategory(editingExpense.category);
    setDate(editingExpense.date)
  }else{
     setTitle("");
    setPrice("");
    setCategory("");
    setDate("")
  }
},[editingExpense, isOpen])

const handleSubmit=(e)=>{
  e.preventDefault();
  const expenseData ={
    id: editingExpense ? editingExpense.id : Date.now().toString(),
    title,
    price : Number(price),
    category,
    date,
  };
  handleExpense(expenseData);
  
  
       setTitle("");
    setPrice("");
    setCategory("");
    setDate("")
}


  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(!isOpen)}
      contentLabel="Add/Edit Expense"
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.modalContent}>
        <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalInputContainer}>
            <input
            autoFocus
              type="text"
              placeholder="Title"
              name="title"
              required
              value={title}
              className={styles.modalInput}
              onChange={(e)=> setTitle(e.target.value)}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              required
              className={styles.modalInput}
              onChange={(e)=> setPrice(e.target.value)}

            />
          </div>

          <div className={styles.modalInputContainer}>
              
            <select name="category" id="" className={styles.modalInput} value={category} required onChange={(e)=> setCategory(e.target.value)}>
                <option value="" >Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}       

            </select>
            <input
              type="date"
              name="date"
              required
              placeholder="dd/mm/yyyy"
              value={date}
              className={styles.modalInput}
              onChange={(e)=> setDate(e.target.value)}
            />
          </div>
          <div className={styles.modalBtnContainer}>
            <button type="submit" className={styles.modalAddBtn}>
              {editingExpense? "Update Expense":"Add Expense"}
            </button>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setIsOpen(!isOpen)}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default AddExpensesModal;
