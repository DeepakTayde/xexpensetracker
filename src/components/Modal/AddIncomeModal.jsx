import React from "react";
import ReactModal from "react-modal";
import styles from "./AddIncomeModal.module.css"; // Assuming you have a CSS file for styles

const AddIncomeModal = ({ isOpen, setIsOpen, onHandleIncome }) => {
  const [amount, setAmount] = React.useState("");



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
        <h2>Add Balance</h2>
        <form onSubmit={(e) => onHandleIncome(amount, e)}>
          <input
            type="number"
            placeholder="Income Amount"
            name="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoFocus
            className={styles.modalInput}
          />
          <button type="submit" className={styles.modalAddBtn}>
            Add Balance
          </button>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={() => setIsOpen(!isOpen)}
          >
            cancel
          </button>
        </form>
      </div>
    </ReactModal>
  );
};

export default AddIncomeModal;
