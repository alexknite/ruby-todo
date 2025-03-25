import { useState, useEffect } from "react";

import {
  get_todos,
  create_item,
  delete_item,
  update_position,
} from "./api/endpoints";

import styles from "./styles/App.module.css";

import { Header } from "./components/Header";
import { TodoList } from "./components/Todo/TodoList";
import { AddTodo } from "./components/Todo/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await get_todos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const createItem = async (content) => {
    const todo = await create_item(content, todos.length);
    setTodos([...todos, todo]);
  };

  const deleteItem = async (id) => {
    delete_item(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };


const updateCompleted = (id, completed) => {
  setTodos((prevTodos) => {
    const updated = prevTodos.map((t) =>
      t.id === id ? { ...t, completed } : t
    );

    // Sort: Completed first, then position
    return updated.sort((a, b) => {
      if (a.completed === b.completed) {
        return a.position - b.position; // Sort by position if completed status is the same
      }
      return b.completed - a.completed; // Completed tasks first
    });
  });
};


  const updateContent = (id, editedContent) => {
    setTodos((prevTodos) => {
      const index = prevTodos.findIndex((t) => t.id === id);
      const updated = [...prevTodos];

      updated[index].content = editedContent;

      return [...updated];
    });
  };

  const moveUp = async (id, newPosition) => {
    if (newPosition < 0) return;
    await update_position(id, newPosition);
    setTodos((prevTodos) => {
      const index = prevTodos.findIndex((t) => t.id === id);
      if (index <= 0) return prevTodos;
      const updated = [...prevTodos];

      [updated[index], updated[index - 1]] = [
        updated[index - 1],
        updated[index],
      ];

      updated[index].position = newPosition;
      updated[index - 1].position = newPosition + 1;

      return [...updated];
    });
  };

  const moveDown = async (id, newPosition) => {
    if (newPosition >= todos.length) return;
    await update_position(id, newPosition);
    setTodos((prevTodos) => {
      const index = prevTodos.findIndex((t) => t.id === id);
      if (index === -1 || index >= prevTodos.length - 1) return prevTodos;
      const updated = [...prevTodos];

      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];

      updated[index].position = updated[index + 1].position;
      updated[index + 1].position = newPosition;

      return [...updated];
    });
  };
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Header />
        <AddTodo createItem={createItem} />
        <TodoList
          todos={todos}
          deleteItem={deleteItem}
          updateCompleted={updateCompleted}
          updateContent={updateContent}
          moveUp={moveUp}
          moveDown={moveDown}
        />
      </div>
    </div>
  );
}

export default App;
