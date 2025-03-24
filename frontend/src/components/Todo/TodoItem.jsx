import React, { useState } from "react";

import { LiaEdit } from "react-icons/lia";
import { IoTrash } from "react-icons/io5";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
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
    updateTodos(id, todo_name, !isChecked);
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
      updateTodos(id, editedText, completed);
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
      {!isChecked && (
        <div className={styles.leftBtns}>
          <MdKeyboardArrowUp size="40px" />
          <MdKeyboardArrowDown size="40px" />
        </div>
      )}
      <div className={styles.content}>
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
            <motion.input
              key={id}
              id={`checkbox-${id}`}
              type="checkbox"
              checked={isChecked}
              onChange={handleComplete}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.label
              htmlFor={`checkbox-${id}`}
              className={styles.itemName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {todo_name}
            </motion.label>
          </AnimatePresence>
        )}
      </div>

      <div className={styles.rightBtns}>
        {!isChecked && <LiaEdit size="45px" onClick={handleEdit} />}
        <IoTrash size="40px" onClick={handleDelete} />
      </div>
    </motion.div>
  );
};
