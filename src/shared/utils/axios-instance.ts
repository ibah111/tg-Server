import axios from 'axios';
import { NODE_ENV } from '../consts/node-env';

export const baseUrl = () => {
  switch (NODE_ENV) {
    case 'development':
      return 'http://localhost:11434/api/';
    case 'production':
      return 'http://host.docker.internal:11434';
  }
};

export const ollamaInstance = axios.create({
  baseURL: baseUrl(),
});
