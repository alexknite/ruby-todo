import React from "react";


import styles from "../../styles/Tag/CreateTag.module.css";

export const CreateTag = ({ tagInput, tags, createTag }) => {
  const handleCreateTag = () => {
    createTag(tagInput);
  };

  const tagExists = tags.find(
    ({ name }) => name.toLowerCase() === tagInput.toLowerCase(),
  );
  return (
    <>
      {!tagExists && (
        <div className={styles.container}>
          <li className={styles.createTag} onClick={handleCreateTag}>
            {tagInput}
          </li>
        </div>
      )}
    </>
  );
};
