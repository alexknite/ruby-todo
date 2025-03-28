import React, { useState } from "react";

import { create_tag, destroy_tag } from "../../api/endpoints.js";

import styles from "../../styles/AddTodo.module.css";

import { TagOptionList } from "../Tag/TagOptionList";
import { SelectedTagList } from "../Tag/SelectedTagList";

export const AddTodo = ({
  createItem,
  tags,
  setTags,
}) => {
  const [input, setInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      createItem(input, selectedTags);
      setInput("");
      setTagInput("");
      setSelectedTags([]);
    }
  };

  const selectTag = (id, name) => {
    setSelectedTags([
      ...selectedTags,
      {
        id: id,
        name: name,
      },
    ]);
    setTagInput("");
  };

  const removeSelectedTag = (id) => {
    setSelectedTags((prevSelectedTags) => {
      return [...prevSelectedTags].filter((t) => t.id !== id);
    });
  };

  const handleEnterTag = (e) => {
    setTagInput(e.target.value);
  };

  const createTag = async (name) => {
    const newTag = await create_tag(name);
    selectTag(newTag.id, newTag.name);
  };

  const destroyTag = async (id) => {
    await destroy_tag(id);
    removeSelectedTag(id);
    setTags((prevTags) => {
      return prevTags.filter((t) => t.id !== id);
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.formGroup} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
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
        </div>
        <div className={styles.tagContainer}>
          <div className={styles.tagInputContainer}>
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
          </div>
          <div className={styles.submitContainer}>
            <button className={styles.submitBtn} type="submit">Submit</button>
          </div>
        </div>
        <SelectedTagList
          selectedTags={selectedTags}
          removeSelectedTag={removeSelectedTag}
          destroyTag={destroyTag}
        />
      </form>
      {tagInput && (
        <TagOptionList
          tags={tags}
          tagInput={tagInput}
          createTag={createTag}
          selectTag={selectTag}
        />
      )}
    </div>
  );
};
