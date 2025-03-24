import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/api/";
const GET_URL = `${BASE_URL}todos`;
const POST_URL = `${BASE_URL}todos`;
const DELETE_URL = (id) => `${BASE_URL}todos/${id}`;
const UPDATE_URL = (id) => `${BASE_URL}todos/${id}/update`;
const UPDATE_POS_URL = (id) => `${BASE_URL}/todos/${id}/update_position`;

export const get_todos = async () => {
  const res = await axios.get(GET_URL);
  return res.data;
};

export const create_todo = async (todo_name, position) => {
  const res = await axios.post(POST_URL, {
    todo_name: todo_name,
    completed: false,
    position: position,
  });
  return res.data;
};

export const delete_todo = async (id) => {
  const res = await axios.delete(DELETE_URL(id));
  return res.data;
};

export const update_todo = async (id, todo_name, completed) => {
  const res = await axios.patch(UPDATE_URL(id), {
    todo_name: todo_name,
    completed: completed,
  });
  return res.data;
};

export const update_position = async (id, newPosition) => {
  const res = await axios.patch(UPDATE_POS_URL(id), {
    position: newPosition,
  });
  return res.data;
};
