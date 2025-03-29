import React, { useState } from "react";

import styles from "../../styles/Tag/TagSettings.module.css";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoTrash } from "react-icons/io5";

export const TagSettings = ({ setShowSettings, id, name }) => {
  const [input, setInput] = useState(name);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      onMouseLeave={() => setShowSettings(false)}
      className={styles.container}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <div className={styles.btnContainer}>
        <IoIosRemoveCircle size="25px" />
        <IoTrash size="25px" />
      </div>
    </div>
  );
};
