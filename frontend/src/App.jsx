import { useState, useEffect } from "react";

import { get_todos, create_item, delete_item, update_position } from "./api/endpoints";

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
      const updated = prevTodos.map((t) => {
        if (t.id === id) return { ...t, completed:completed };
        else return t;
      });

      return updated;
    });
  };

  const updateContent = (id, editedContent) => {
    setTodos((prevTodos) => {
      const updated = prevTodos.map((t) => {
        if (t.id === id) return { ...t, content: editedContent };
        else return t;
      });

      return updated;
    });
  };

const moveUp = async (id, newPosition) => {
  await update_position(id, newPosition); // Update position in the backend
  setTodos((prevTodos) => {
    const updated = prevTodos.map((t) => {
      if (t.id === id) return { ...t, position: newPosition };
      return t;
    });
    return updated;
  });
};

const moveDown = async (id, newPosition) => {
  await update_position(id, newPosition); // Update position in the backend
  setTodos((prevTodos) => {
    const updated = prevTodos.map((t) => {
      if (t.id === id) return { ...t, position: newPosition };
      return t;
    });
    return updated;
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
