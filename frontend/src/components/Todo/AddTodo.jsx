import React, { useState } from "react";

import styles from "../../styles/AddTodo.module.css";

export const AddTodo = ({ createItem }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      createItem(input);
      setInput("");
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.formGroup} onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.formField} ${styles.addInput}`}
          id="input"
          name="input"
          placeholder="Type something..."
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
        />
        <label htmlFor="input" className={styles.label}>
          Add Item
        </label>
      </form>
    </div>
  );
};
