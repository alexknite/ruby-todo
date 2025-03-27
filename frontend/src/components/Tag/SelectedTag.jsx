import React from "react";

import styles from "../../styles/SelectedTag.module.css";

export const SelectedTag = ({ id, name, removeSelectedTag, destroyTag}) => {
  const handleRemoveSelectedTag = () => {
    removeSelectedTag(id);
  };
  const handleDestroyTag = () => {
    destroyTag(id);
  }
  return (
    <div className={styles.container}>
      <li className={styles.tag} key={`tag-${id}`}>
        {name}
      </li>
      <button
        id={`removeBtn-${id}`}
        className={styles.removeBtn}
        onClick={handleRemoveSelectedTag}
      >
        X
      </button>
      <button
        id={`destroyBtn-${id}`}
        className={styles.destroyBtn}
        onClick={handleDestroyTag}
      >Trash</button>
    </div>
  );
};
