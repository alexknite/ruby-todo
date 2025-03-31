import React, { useState } from "react";

import { create_tag } from "./../api/endpoints.js";

import styles from "./../styles/Todo/AddTodo.module.css";

import { Form } from "./Form.jsx";
import { TagOptionList } from "./Tag/TagOptionList";
import { SelectedTagList } from "./Tag/SelectedTagList";

export const AddTodo = ({
  tags,
  selectedTags,
  setSelectedTags,
  removeSelectedTag,
  destroyTag,
  createItem,
  setTags,
}) => {
  const [input, setInput] = useState("");
  const [tagInput, setTagInput] = useState("");

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

  const createTag = async (name) => {
    const newTag = await create_tag(name);
    setTags((prevTags) => [...prevTags, newTag]);
    selectTag(newTag.id, newTag.name);
  };

  const submitForm = () => {
    if (input.trim() !== "") {
      createItem(input, selectedTags);
      setInput("");
      setTagInput("");
      setSelectedTags([]);
    }
  };
  return (
    <div className={styles.container}>
      <Form
        input={input}
        tagInput={tagInput}
        selectedTags={selectedTags}
        setInput={setInput}
        setTagInput={setTagInput}
        submitForm={submitForm}
      />
      <div className={styles.tagsContainer}>
        <SelectedTagList
          selectedTags={selectedTags}
          removeSelectedTag={removeSelectedTag}
          destroyTag={destroyTag}
        />
        {tagInput && (
          <TagOptionList
            tags={tags}
            tagInput={tagInput}
            createTag={createTag}
            selectTag={selectTag}
          />
        )}
      </div>
    </div>
  );
};
