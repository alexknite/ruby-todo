import React from "react";

import { SelectedTag } from "./SelectedTag";

export const SelectedTagList = ({ selectedTags, removeSelectedTag}) => {
  return (
    <ul>
      {selectedTags &&
        selectedTags.map(({ tag_id, tag_name }) => (
          <SelectedTag
            key={`selected-${tag_id}`}
            tagId={tag_id}
            tagName={tag_name}
            removeSelectedTag={removeSelectedTag}
          />
        ))}
    </ul>
  );
};
