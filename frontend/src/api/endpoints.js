import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/api/";
const GET_URL = `${BASE_URL}todos`;
const POST_URL = `${BASE_URL}todos`;
const DELETE_URL = (id) => `${BASE_URL}todos/${id}`;
const UPDATE_COMPLETE_URL = (id) => `${BASE_URL}todos/${id}/update_complete`;
const UPDATE_CONTENT_URL = (id) => `${BASE_URL}todos/${id}/update_content`;
const UPDATE_POSITION_URL = (id) => `${BASE_URL}/todos/${id}/update_position`;

export const get_todos = async () => {
  const res = await axios.get(GET_URL);
  return res.data;
};

export const create_item = async (content, position) => {
  const res = await axios.post(POST_URL, {
    content: content,
    completed: false,
    position: position,
  });
  return res.data;
};

export const delete_item = async (id) => {
  const res = await axios.delete(DELETE_URL(id));
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
