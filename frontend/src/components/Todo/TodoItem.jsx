import React, { useState } from "react";

import { LiaEdit } from "react-icons/lia";
import { IoTrash } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import { update_todo } from "../../api/endpoints";

import styles from "../../styles/TodoItem.module.css";

export const TodoItem = ({
  todo_name,
  id,
  deleteTodo,
  completed,
  updateTodos,
}) => {
  const [isChecked, setChecked] = useState(completed);
  const [isEditing, toggleEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo_name);

  const handleDelete = async () => {
    await deleteTodo(id);
  };
  const handleComplete = async () => {
    await update_todo(id, todo_name, !isChecked);
    setChecked(!isChecked);
  };
  const handleEdit = () => {
    toggleEditing(!isEditing);
  };
  const handleChange = (e) => {
    setEditedText(e.target.value);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (editedText.trim() !== "" && editedText !== todo_name) {
      await update_todo(id, editedText, completed);
      updateTodos(id, editedText);
    }
    toggleEditing(false);
  };

  return (
    <motion.div
      className={styles.container}
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.checkboxWrapper}>
        <input
          id={`checkbox-${id}`}
          type="checkbox"
          checked={isChecked}
          onChange={handleComplete}
        />
        <label htmlFor={`checkbox-${id}`}>
          <div className={styles.tickMark}></div>
        </label>
      </div>
      {isEditing ? (
        <form onSubmit={handleSave} className={styles.formWrapper}>
          <AnimatePresence>
            <motion.input
              type="text"
              value={editedText}
              onChange={handleChange}
              onBlur={handleEdit}
              className={styles.editInput}
              autoFocus
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </AnimatePresence>
        </form>
      ) : (
        <AnimatePresence>
          <motion.h3
            className={styles.itemName}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {todo_name}
          </motion.h3>
        </AnimatePresence>
      )}

      <div className={styles.buttonWrapper}>
        <LiaEdit size="45px" onClick={handleEdit} />
        <IoTrash size="40px" onClick={handleDelete} />
      </div>
    </motion.div>
  );
};
