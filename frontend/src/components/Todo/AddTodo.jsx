import React, { useState } from "react";

import styles from "../../styles/AddTodo.module.css";

import { TagOptionList } from "../Tag/TagOptionList";
import { SelectedTagList } from "../Tag/SelectedTagList";

export const AddTodo = ({ createItem, tags }) => {
  const [input, setInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      createItem(input);
      setInput("");
      setTagInput("");
      setSelectedTags([]);
    }
  };

  const filteredTags = tags.filter(({ name }) =>
    name.toLowerCase().includes(tagInput.toLowerCase()),
  );

  const removeSelectedTag = (tag_id) => {
    setSelectedTags((prevSelectedTags) => {
      return [...prevSelectedTags].filter((t) => t.tag_id !== tag_id);
    });
  };

  const handleEnterTag = (e) => {
    setTagInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formGroup} onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.addInputField} ${styles.addInput}`}
          id="input"
          name="input"
          placeholder="Type something..."
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
        />
        <label htmlFor="input" className={styles.addInputLabel}>
          Add Item
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          className={`${styles.addTagField} ${styles.tagInput}`}
          value={tagInput}
          placeholder="Type something..."
          onChange={handleEnterTag}
        />
        <label htmlFor="tags" className={styles.addTagLabel}>
          Add Tag
        </label>
        <SelectedTagList
          selectedTags={selectedTags}
          removeSelectedTag={removeSelectedTag}
        />
      </form>
      <TagOptionList
        tagInput={tagInput}
        filteredTags={filteredTags}
        setTagInput={setTagInput}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </div>
  );
};
