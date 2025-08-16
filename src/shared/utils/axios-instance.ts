import axios from 'axios';
import { NODE_ENV } from '../consts/node-env';

export const baseUrl = () => {
  switch (NODE_ENV) {
    case 'development':
      return 'http://127.0.0.1:11434';
    case 'production':
      return 'http://host.docker.internal:11434';
  }
};

export const ollamaInstance = axios.create({
  baseURL: baseUrl(),
});
