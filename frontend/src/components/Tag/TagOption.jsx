import React from "react";

import styles from '../../styles/Tag/TagOption.module.css';

export const TagOption = ({ id, name, selectTag }) => {
  const handleSelectTag = () => {
    selectTag(id, name);
  };

  return <li className={styles.tag} onClick={handleSelectTag}>{name}</li>;
};
