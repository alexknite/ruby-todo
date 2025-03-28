import React, { useState } from "react";

import { Tag } from "../Tag/Tag";

import { LiaEdit } from "react-icons/lia";
import { IoTrash } from "react-icons/io5";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import { update_complete, update_content } from "../../api/endpoints";

import styles from "../../styles/Todo/TodoItem.module.css";

export const TodoItem = ({
  length,
  id,
  position,
  content,
  completed,
  tags,
  deleteItem,
  updateCompleted,
  updateContent,
  moveUp,
  moveDown,
  lastCompleted,
}) => {
  const [isChecked, setChecked] = useState(completed);
  const [isEditing, toggleEditing] = useState(false);
  const [editedContent, setEditedText] = useState(content);

  const handleDelete = async () => {
    await deleteItem(id);
  };

  const handleComplete = async () => {
    await update_complete(id, !isChecked);
    updateCompleted(id, !isChecked);
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
    if (editedContent.trim() !== "" && editedContent !== content) {
      await update_content(id, editedContent);
      updateContent(id, editedContent);
    }
    toggleEditing(false);
  };

  const handleMoveUp = async () => {
    if (position > 0) {
      const newPosition = position - 1;
      moveUp(id, newPosition);
    }
  };

  const handleMoveDown = async () => {
    if (position < length - 1) {
      const newPosition = position + 1;
      moveDown(id, newPosition);
    }
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
      {!isChecked && !isEditing && (
        <motion.div
          className={styles.leftBtns}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {position > 0 && position !== lastCompleted().position + 1 && (
            <MdKeyboardArrowUp size="40px" onClick={handleMoveUp} />
          )}
          {position !== length - 1 && (
            <MdKeyboardArrowDown size="40px" onClick={handleMoveDown} />
          )}
        </motion.div>
      )}
      <div className={styles.content}>
        {isEditing ? (
          <form onSubmit={handleSave} className={styles.formWrapper}>
            <AnimatePresence>
              <motion.input
                type="text"
                value={editedContent}
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
          <div className={styles.content}>
            <ul className={styles.tagsContainer}>
              {tags &&
                tags.map((tag) => <Tag {...tag} key={`Tag-${tag.id}`} />)}
            </ul>
            <motion.input
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
              {content}
            </motion.label>
          </div>
        )}
      </div>

      <div className={styles.rightBtns}>
        {!isChecked && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LiaEdit size="45px" onClick={handleEdit} />
          </motion.div>
        )}
        <IoTrash size="40px" onClick={handleDelete} />
      </div>
    </motion.div>
  );
};
