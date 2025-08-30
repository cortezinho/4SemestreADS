import axios from 'axios'

const api = axios.create({
  baseURL: "https://dog.ceo/api",
  timeout: 5000, 
});

export default api;
