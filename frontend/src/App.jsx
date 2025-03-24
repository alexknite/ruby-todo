import { useState, useEffect } from "react";

import {
  get_todos,
  create_todo,
  delete_todo,
  update_todo,
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

  const addTodo = async (todo_name) => {
    const todo = await create_todo(todo_name);
    setTodos([todo, ...todos]);
  };

  const deleteTodo = async (id) => {
    delete_todo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodos = (id, editedText) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) return { ...t, todo_name: editedText };
        else return t;
      }),
    );
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
