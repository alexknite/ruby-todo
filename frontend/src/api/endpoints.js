import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/api/";
const GET_URL = `${BASE_URL}todos`;
const POST_URL = `${BASE_URL}todos`;
const DELETE_URL = (id) => `${BASE_URL}todos/${id}`;
const UPDATE_URL = (id) => `${BASE_URL}todos/${id}/update`;

export const get_todos = async () => {
  const res = await axios.get(GET_URL);
  return res.data;
};

export const create_todo = async (todo_name, index) => {
  const res = await axios.post(POST_URL, {
    todo_name: todo_name,
    completed: false,
    position: index,
  });
  return res.data;
};

export const delete_todo = async (id) => {
  const res = await axios.delete(DELETE_URL(id));
  return res.data;
};

export const update_todo = async (id, todo_name, completed, index) => {
  const res = await axios.patch(UPDATE_URL(id), {
    todo_name: todo_name,
    completed: completed,
    position: index,
  });
  return res.data;
};
