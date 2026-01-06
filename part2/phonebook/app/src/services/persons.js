import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const getRequest = axios.get(baseUrl);
  return getRequest.then((response) => response.data);
};

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const createPerson = (newPerson) => {
  const promise = axios.post(baseUrl, newPerson);
  return promise.then((response) => response.data);
};

const replacePerson = (id, person) => {
  return axios
    .put(`${baseUrl}/${id}`, person)
    .then((response) => response.data);
};

export default {
  getAll,
  deleteById,
  createPerson,
  replacePerson,
};
