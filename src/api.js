import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseUrl: BASE_URL,
});

export default api;

export {
  BASE_URL,
};
