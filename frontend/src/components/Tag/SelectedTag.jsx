import React from "react";

import styles from "../../styles/SelectedTag.module.css";

export const SelectedTag = ({ tagId, tagName, removeSelectedTag }) => {
  const handleRemoveSelectedTag = () => {
    removeSelectedTag(tagId);
  };
  return (
    <div className={styles.container}>
      <li className={styles.tag} key={`tag-${tagId}`}>
        {tagName}
      </li>
      <button
        id={`button-${tagId}`}
        className={styles.removeBtn}
        onClick={handleRemoveSelectedTag}
      >
        X
      </button>
    </div>
  );
};
