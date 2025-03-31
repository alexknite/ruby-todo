import React, { useState } from "react";

import styles from "../../styles/Tag/TagSettings.module.css";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoTrash } from "react-icons/io5";

export const TagSettings = ({
  todoId,
  tagId,
  name,
  setShowSettings,
  destroyTag,
  removeTag,
}) => {
  const [input, setInput] = useState(name);

  return (
    <div
      onMouseLeave={() => setShowSettings(false)}
      className={styles.container}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className={styles.btnContainer}>
        <IoIosRemoveCircle
          size="25px"
          onClick={() => removeTag(todoId, tagId)}
        />
        <IoTrash size="25px" onClick={() => destroyTag(tagId)} />
      </div>
    </div>
  );
};
