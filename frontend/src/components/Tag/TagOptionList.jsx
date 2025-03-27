import React from "react";

import { TagOption } from "../Tag/TagOption";

export const TagOptionList = ({
  tagInput,
  filteredTags,
  setTagInput,
  setSelectedTags,
  selectedTags,
}) => {
  return (
    <ul>
      {(tagInput && filteredTags) &&
        filteredTags.map(({ id, name }) => (
          <TagOption
            key={id}
            id={id}
            name={name}
            setTagInput={setTagInput}
            setSelectedTags={setSelectedTags}
            selectedTags={selectedTags}
          />
        ))}
    </ul>
  );
};
