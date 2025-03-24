import { useState, useEffect } from "react";

import {
  get_todos,
  create_todo,
  delete_todo,
} from "./api/endpoints";

import styles from "./styles/App.module.css";

import { Header } from "./components/Header";
import { TodoList } from "./components/Todo/TodoList";
import { AddTodo } from "./components/Todo/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);

  const length = todos.length;

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await get_todos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const addTodo = async (todo_name) => {
    const todo = await create_todo(todo_name, length);
    setTodos([...todos, todo]);
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

  const moveUp = (id, newPosition) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((t) => {
        if (t.position === newPosition)
          return { ...t, position: newPosition + 1 };
        else if (t.id == id) return { ...t, position: newPosition };
        else return t;
      });
      return updatedTodos.sort((a, b) => a.position - b.position);
    });
  };

  // const moveDown = (id, newPosition) => {
  //   setTodos((prevTodos) => {
  //     const updatedTodos = prevTodos.map((t) => {
  //       if (t.position === newPosition)
  //         return { ...t, position: newPosition - 1 };
  //       else if (t.id == id) return { ...t, position: newPosition };
  //       else return t;
  //     });
  //     return updatedTodos.sort((a, b) => a.position - b.position);
  //   });
  // };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Header />
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodos={updateTodos}
          moveUp={moveUp}
          /* moveDown={moveDown} */
          length={length}
        />
      </div>
    </div>
  );
}

export default App;
