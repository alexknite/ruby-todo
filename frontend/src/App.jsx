import { useState, useEffect } from "react";

import { get_todos, create_todo, delete_todo } from "./api/endpoints";

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

  const addTodo = async (todo_name, index) => {
    const todo = await create_todo(todo_name, index);
    setTodos([todo, ...todos]);
  };

  const deleteTodo = async (id) => {
    delete_todo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodos = (id, editedText, completed) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((t) => {
        if (t.id === id) return { ...t, todo_name: editedText, completed };
        else return t;
      });

      return updatedTodos.sort((a, b) => a.completed - b.completed);
    });
  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Header />
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodos={updateTodos}
        />
      </div>
    </div>
  );
}

export default App;
