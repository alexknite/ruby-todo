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
        filteredTags.map((tag) => (
          <TagOption
            key={`TagOption-${tag.id}`}
            setTagInput={setTagInput}
            setSelectedTags={setSelectedTags}
            selectedTags={selectedTags}
            selectTag={selectTag}
          />
        ))}
    </ul>
  );
};
