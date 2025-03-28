import React from "react";

import styles from "../styles/Form.module.css";

export const Form = ({ input, tagInput, setInput, setTagInput, submitForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form className={styles.formGroup} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={`${styles.addInputField} ${styles.addInput}`}
          id="input"
          name="input"
          placeholder=""
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
        />
        <label htmlFor="input" className={styles.addInputLabel}>
          Add Item
        </label>
      </div>
      <div className={styles.tagContainer}>
        <div className={styles.tagInputContainer}>
          <input
            type="text"
            maxLength={19}
            id="tags"
            name="tags"
            className={`${styles.addTagField} ${styles.tagInput}`}
            value={tagInput}
            placeholder=""
            onChange={(e) => setTagInput(e.target.value)}
          />
          <label htmlFor="tags" className={styles.addTagLabel}>
            Add Tag
          </label>
        </div>
        <div className={styles.submitContainer}>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
