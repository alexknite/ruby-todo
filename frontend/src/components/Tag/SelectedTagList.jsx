import React from "react";

import { SelectedTag } from "./SelectedTag";

export const SelectedTagList = ({
  selectedTags,
  removeSelectedTag,
  destroyTag,
}) => {
  return (
    <ul>
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
