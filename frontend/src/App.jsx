import { useState, useEffect } from "react";

import {
  get_todos,
  create_item,
  delete_item,
  update_position,
  get_tags,
  add_tag,
} from "./api/endpoints";

import styles from "./styles/App.module.css";

import { Header } from "./components/Header";
import { TodoList } from "./components/Todo/TodoList";
import { AddTodo } from "./components/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await get_todos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await get_tags();
      setTags(tags);
    };
    fetchTags();
  }, []);

  const createItem = async (content, selectedTags) => {
    const todo = await create_item(content, todos.length);

    if (selectedTags.length > 0) {
      await Promise.all(
        selectedTags.map(async (tag) => {
          await add_tag(todo.id, tag.id);
        }),
      );

      const updatedTodo = { ...todo, tags: selectedTags };
      setTodos([...todos, updatedTodo]);
    } else {
      setTodos([...todos, todo]);
    }
  };

  const deleteItem = async (id) => {
    await delete_item(id);
    setTodos((prevTodos) => {
      const deletedTodo = prevTodos.find((todo) => todo.id === id);

      return prevTodos
        .filter((todo) => todo.id !== id)
        .map((todo) =>
          todo.position > deletedTodo.position
            ? { ...todo, position: todo.position - 1 }
            : todo,
        );
    });
  };

  const updateCompleted = (id, completed) => {
    setTodos((prevTodos) => {
      let updated = prevTodos.map((t) =>
        t.id === id ? { ...t, completed } : t,
      );

      const task = updated.find((t) => t.id === id);
      updated = updated.filter((t) => t.id !== id);

      if (completed) {
        updated = [
          { ...task, position: 0 },
          ...updated.map((t, i) => ({ ...t, position: i + 1 })),
        ];
      } else {
        updated = [
          ...updated.map((t, i) => ({ ...t, position: i })),
          { ...task, position: updated.length },
        ];
      }

      return updated;
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
      const updated = [...prevTodos];
      const item1 = updated.find((t) => t.id === id);
      const index = updated.indexOf(item1);

      const item2 = updated.find((t) => t.position === newPosition);

      [updated[index], updated[index - 1]] = [
        updated[index - 1],
        updated[index],
      ];

      item2.position = item1.position;
      item1.position = newPosition;

      return [...updated];
    });
  };

  const moveDown = async (id, newPosition) => {
    if (newPosition >= todos.length) return;
    await update_position(id, newPosition);
    setTodos((prevTodos) => {
      const updated = [...prevTodos];
      const item1 = updated.find((t) => t.id === id);
      const index = updated.indexOf(item1);

      const item2 = updated.find((t) => t.position === newPosition);

      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];

      item2.position = item1.position;
      item1.position = newPosition;

      return [...updated];
    });
  };

  const lastCompleted = () => {
    const result = [...todos].reverse().find((t) => t.completed);
    return result ? result : -1;
  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <Header />
        <AddTodo
          createItem={createItem}
          tags={tags}
          setTags={setTags}
          setTodos={setTodos}
        />
        <TodoList
          todos={todos}
          deleteItem={deleteItem}
          updateCompleted={updateCompleted}
          updateContent={updateContent}
          moveUp={moveUp}
          moveDown={moveDown}
          lastCompleted={lastCompleted}
        />
      </div>
    </div>
  );
}

export default App;
