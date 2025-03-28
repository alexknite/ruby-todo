import React from "react";

import { SelectedTag } from "./SelectedTag";

import styles from '../../styles/Tag/SelectedTagList.module.css'
export const SelectedTagList = ({
  selectedTags,
  removeSelectedTag,
  destroyTag,
}) => {
  return (
    <ul className={styles.container}>
      {selectedTags &&
        selectedTags.map((tag) => (
          <SelectedTag
            {...tag}
            key={`SelectedTag-${tag.id}`}
            removeSelectedTag={removeSelectedTag}
            destroyTag={destroyTag}
          />
        ))}
    </ul>
  );
};
