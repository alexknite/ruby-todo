import React from "react";

import { TagOption } from "../Tag/TagOption";
import { CreateTag } from "./CreateTag";

import styles from '../../styles/Tag/TagOptionList.module.css';

export const TagOptionList = ({
  tags,
  tagInput,
  createTag,
  selectTag,
}) => {
    const filteredTags = tags.filter(({ name }) =>
    name.toLowerCase().includes(tagInput.toLowerCase()),
  );
  return (
    <ul className={styles.tagOptions}>
      <CreateTag tags={tags} tagInput={tagInput} createTag={createTag} />
      {tagInput &&
        filteredTags &&
        filteredTags.map((tag) => (
          <TagOption
            {...tag}
            key={`TagOption-${tag.id}`}
            selectTag={selectTag}
          />
        ))}
    </ul>
  );
};
