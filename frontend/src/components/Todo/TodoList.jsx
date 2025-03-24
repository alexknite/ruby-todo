import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { TodoItem } from "./TodoItem";

import styles from "../../styles/TodoList.module.css";

export const TodoList = ({
  todos,
  deleteTodo,
  updateTodos,
  moveUp,
  length,
}) => {
  return (
    <AnimatePresence mode="popLayout">
      {todos.length > 0 && (
        <motion.section
          className={styles.container}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AnimatePresence mode="popLayout">
            {todos.map(({ id, todo_name, completed, position }) => (
              <TodoItem
                key={id}
                id={id}
                position={position}
                todo_name={todo_name}
                completed={completed}
                deleteTodo={deleteTodo}
                updateTodos={updateTodos}
                moveUp={moveUp}
                length={length}
              />
            ))}
          </AnimatePresence>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
