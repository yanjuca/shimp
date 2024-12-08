import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',  // URL base para a API do Express
});

export default api;
