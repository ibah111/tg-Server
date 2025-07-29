import axios from 'axios';

export const openai_instance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  timeout: 10000,
  proxy: {
    auth: {
      username: '7s6rF2tp',
      password: 'fxyz3GP9',
    },
    host: '156.246.237.131',
    port: 63410,
    protocol: 'http',
  },
});
