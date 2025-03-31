import React, { useState } from "react";

import styles from "../../styles/Tag/Tag.module.css";
import { TagSettings } from "./TagSettings";

export const Tag = ({
  tagId,
  todoId,
  name,
  destroyTag,
  removeTag,
  updateTagName,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={styles.container}>
      {showSettings && (
        <TagSettings
          tagId={tagId}
          todoId={todoId}
          name={name}
          setShowSettings={setShowSettings}
          destroyTag={destroyTag}
          removeTag={removeTag}
          updateTagName={updateTagName}
        />
      )}
      <li
        onMouseEnter={() => setShowSettings(!showSettings)}
        className={styles.tag}
      >
        {name}
      </li>
    </div>
  );
};
