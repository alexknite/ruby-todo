import React from "react";

import { TagOption } from "../Tag/TagOption";
import { CreateTag } from "./CreateTag";

export const TagOptionList = ({
  tags,
  tagInput,
  filteredTags,
  setTagInput,
  setSelectedTags,
  selectedTags,
  createTag,
  selectTag,
}) => {
  return (
    <ul>
      <CreateTag tags={tags} tagInput={tagInput} createTag={createTag} />
      {tagInput &&
        filteredTags &&
        filteredTags.map(({ id, name }) => (
          <TagOption
            key={id}
            id={id}
            name={name}
            setTagInput={setTagInput}
            setSelectedTags={setSelectedTags}
            selectedTags={selectedTags}
            selectTag={selectTag}
          />
        ))}
    </ul>
  );
};
