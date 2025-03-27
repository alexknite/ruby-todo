import React from "react";

export const TagOption = ({ id, name, selectTag }) => {
  const handleSelectTag = () => {
    selectTag(id, name);
  };

  return <li onClick={handleSelectTag}>{name}</li>;
};
