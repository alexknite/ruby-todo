import React, { useState } from "react";

import styles from "../../styles/Tag/Tag.module.css";
import { TagSettings } from "./TagSettings";

export const Tag = ({ id, name }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={styles.container}>
      {showSettings && (
        <TagSettings id={id} name={name} setShowSettings={setShowSettings} />
      )}
      <li onClick={() => setShowSettings(!showSettings)} className={styles.tag}>
        {name}
      </li>
    </div>
  );
};
