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
        selectedTags.map(({ id, name }) => (
          <SelectedTag
            key={`selected-${id}`}
            id={id}
            name={name}
            removeSelectedTag={removeSelectedTag}
            destroyTag={destroyTag}
          />
        ))}
    </ul>
  );
};
