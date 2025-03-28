import React from "react";

import { TagOption } from "../Tag/TagOption";
import { CreateTag } from "./CreateTag";

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
    <ul>
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
