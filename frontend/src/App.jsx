import { useState, useEffect } from "react";

import {
  get_todos,
  create_item,
  delete_item,
  update_position,
  get_tags,
  add_tag,
  destroy_tag,
  remove_tag,
} from "./api/endpoints";

import styles from "./styles/App.module.css";

import { Header } from "./components/Header";
import { TodoList } from "./components/Todo/TodoList";
import { AddTodo } from "./components/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

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
  const removeSelectedTag = (id) => {
    setSelectedTags((prevSelectedTags) => {
      return [...prevSelectedTags].filter((t) => t.id !== id);
    });
  };

  const destroyTag = async (id) => {
    await destroy_tag(id);
    removeSelectedTag(id);
    setTags((prevTags) => {
      return prevTags.filter((t) => t.id !== id);
    });
    setTodos((prevTodos) => {
      if (prevTodos.length > 0) {
        prevTodos.forEach((todo) => {
          const updatedTags = todo.tags.filter((tag) => tag.id !== id);
          todo.tags = updatedTags;
        });
      }
      return [...prevTodos];
    });
  };

  const removeTag = async (todo_id, tag_id) => {
    await remove_tag(todo_id, tag_id);
    setTodos((prevTodos) => {
      const updatedTodo = prevTodos.find((t) => t.id === todo_id);
      const updatedTags = updatedTodo.tags.filter((t) => t.id !== tag_id);
      updatedTodo.tags = updatedTags;
      return [...prevTodos];
    });
  };

  const updateTagName = async (id, editedTagName) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.id === id ? { ...tag, name: editedTagName } : tag,
      ),
    );

    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        tags: todo.tags.map((tag) =>
          tag.id === id ? { ...tag, name: editedTagName } : tag,
        ),
      })),
    );
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
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          removeSelectedTag={removeSelectedTag}
          destroyTag={destroyTag}
        />
        <TodoList
          todos={todos}
          deleteItem={deleteItem}
          updateCompleted={updateCompleted}
          updateContent={updateContent}
          moveUp={moveUp}
          moveDown={moveDown}
          lastCompleted={lastCompleted}
          destroyTag={destroyTag}
          removeTag={removeTag}
          updateTagName={updateTagName}
        />
      </div>
    </div>
  );
}

export default App;
