import React from "react";

export const TagOption = ({
  id,
  name,
  setTagInput,
  setSelectedTags,
  selectedTags,
}) => {
  const handleSelectTag = () => {
    setSelectedTags([...selectedTags, { tag_name: name, tag_id: id }]);
    setTagInput("");
  };

  return <li onClick={handleSelectTag}>{name}</li>;
};
