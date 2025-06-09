import React from "react";
import styles from "./AddExpensesModal.module.css";
import ReactModal from "react-modal";
import { categories } from "../../constants/categories";


const AddExpensesModal = ({handleExpense, isOpen, setIsOpen }) => {



  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(!isOpen)}
      contentLabel="Add Income Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.modalContent}>
        <h2>Add Expenses</h2>
        <form onSubmit={handleExpense}>
          <div className={styles.modalInputContainer}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              required
              className={styles.modalInput}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              className={styles.modalInput}
            />
          </div>

          <div className={styles.modalInputContainer}>
            <select name="category" id="" className={styles.modalInput} required>
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
              className={styles.modalInput}
            />
          </div>
          <div className={styles.modalBtnContainer}>
            <button type="submit" className={styles.modalAddBtn}>
              Add Expense
            </button>
            <button
              type="submit"
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
