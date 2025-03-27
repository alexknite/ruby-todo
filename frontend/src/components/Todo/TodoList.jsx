import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { TodoItem } from "./TodoItem";

import styles from "../../styles/TodoList.module.css";

export const TodoList = ({
  todos,
  deleteItem,
  updateCompleted,
  updateContent,
  moveUp,
  moveDown,
  lastCompleted,
}) => {
  return (
    <AnimatePresence>
      {todos.length > 0 && (
        <motion.section
          className={styles.container}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <TodoItem
                {...todo}
                length={todos.length}
                key={todo.id}
                deleteItem={deleteItem}
                updateCompleted={updateCompleted}
                updateContent={updateContent}
                moveUp={moveUp}
                moveDown={moveDown}
                lastCompleted={lastCompleted}
              />
            ))}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
