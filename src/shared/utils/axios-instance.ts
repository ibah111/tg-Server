import axios from 'axios';

export const ollamaInstance = axios.create({
  baseURL: 'http://localhost:11434/api/',
});
