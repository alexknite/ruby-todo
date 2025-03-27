import axios from "axios";

/* ---------- TODOS ---------- */
const BASE_URL = "http://127.0.0.1:3000/api/";
const GET_TODOS_URL = `${BASE_URL}todos`;
const POST_TODOS_URL = `${BASE_URL}todos`;
const DELETE_TODOS_URL = (id) => `${BASE_URL}todos/${id}`;
const UPDATE_COMPLETE_URL = (id) => `${BASE_URL}todos/${id}/update_complete`;
const UPDATE_CONTENT_URL = (id) => `${BASE_URL}todos/${id}/update_content`;
const UPDATE_POSITION_URL = (id) => `${BASE_URL}/todos/${id}/update_position`;

export const get_todos = async () => {
  const res = await axios.get(GET_TODOS_URL);
  return res.data;
};

export const create_item = async (content, position) => {
  const res = await axios.post(POST_TODOS_URL, {
    content: content,
    completed: false,
    position: position,
  });
  return res.data;
};

export const delete_item = async (id) => {
  const res = await axios.delete(DELETE_TODOS_URL(id));
  return res.data;
};

export const update_content = async (id, content) => {
  const res = await axios.patch(UPDATE_CONTENT_URL(id), {
    content: content,
  });
  return res.data;
};

export const update_complete = async (id, completed) => {
  const res = await axios.patch(UPDATE_COMPLETE_URL(id), {
    completed: completed,
  });
  return res.data;
};

export const update_position = async (id, position) => {
  const res = await axios.patch(UPDATE_POSITION_URL(id), {
    position: position,
  });
  return res.data;
};

/* ---------- TAGS ---------- */
const GET_TAGS_URL = `${BASE_URL}tags`;
const POST_CREATE_TAG_URL = `${BASE_URL}tags`;
const POST_ADD_TAG_URL = `${BASE_URL}todo_tags`;
const DELETE_REMOVE_TAG_URL = (todo_id, tag_id) =>
  `${BASE_URL}todo_tags?todo_id=${todo_id}&tag_id=${tag_id}`;
const DELETE_DESTROY_TAG_URL = (id) => `${BASE_URL}tags/${id}`;

export const get_tags = async () => {
  const res = await axios.get(GET_TAGS_URL);
  return res.data;
};

export const create_tag = async (name) => {
  const res = await axios.post(POST_CREATE_TAG_URL, {
    name: name,
  });
  return res.data;
};

export const add_tag = async (todo_id, tag_id) => {
  const res = await axios.post(POST_ADD_TAG_URL, {
    todo_id: todo_id,
    tag_id: tag_id,
  });
  return res.data;
};

export const remove_tag = async (todo_id, tag_id) => {
  const res = await axios.delete(DELETE_REMOVE_TAG_URL, {
    todo_id: todo_id,
    tag_id: tag_id,
  });
  return res.data;
};

export const destroy_tag = async (id) => {
  const res = await axios.delete(DELETE_DESTROY_TAG_URL(id));
  return res.data;
};
