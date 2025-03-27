import React from "react";

export const CreateTag = ({ tagInput, tags, createTag }) => {
  const handleCreateTag = () => {
    createTag(tagInput);    
  };

  const tagExists = tags.find(
    ({ name }) => name.toLowerCase() === tagInput.toLowerCase(),
  );
  return <>{!tagExists && <li onClick={handleCreateTag}>{tagInput}</li>}</>;
};
