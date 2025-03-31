import React, { useState } from "react";

import styles from "../../styles/Tag/TagSettings.module.css";
import { IoIosRemoveCircle, IoIosSave } from "react-icons/io";
import { IoTrash } from "react-icons/io5";
import { update_name } from "../../api/endpoints";

export const TagSettings = ({
  todoId,
  tagId,
  name,
  setShowSettings,
  destroyTag,
  removeTag,
  updateTagName,
}) => {
  const [input, setInput] = useState(name);

  const handleSave = async () => {
    if (input.trim() !== "" && input !== name) {
      await update_name(tagId, input);
      updateTagName(tagId, input)
    }
  };

  return (
    <div
      onMouseLeave={() => setShowSettings(false)}
      className={styles.container}
    >
      <input
        type="text"
        maxLength={19}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className={styles.btnContainer}>
        <IoIosSave size="25px" onClick={handleSave} />
        <IoIosRemoveCircle
          size="25px"
          onClick={() => removeTag(todoId, tagId)}
        />
        <IoTrash size="25px" onClick={() => destroyTag(tagId)} />
      </div>
    </div>
  );
};
