import React from "react";

import { IoIosRemoveCircle } from "react-icons/io";
import { IoTrash } from "react-icons/io5";

import styles from "../../styles/Tag/SelectedTag.module.css";

export const SelectedTag = ({ id, name, removeSelectedTag, destroyTag }) => {
  const handleRemoveSelectedTag = () => {
    removeSelectedTag(id);
  };
  const handleDestroyTag = () => {
    destroyTag(id);
  };
  return (
    <div className={styles.container}>
      <li className={styles.tag} key={`tag-${id}`}>
        <p>{name}</p>
        <div className={styles.btnContainer}>
          <IoIosRemoveCircle
            size="30px"
            id={`removeBtn-${id}`}
            onClick={handleRemoveSelectedTag}
          />
          <IoTrash
            size="30px"
            id={`destroyBtn-${id}`}
            onClick={handleDestroyTag}
          />
        </div>
      </li>
    </div>
  );
};
