import axios from 'axios';

/** Axios instance preconfigured for the Rest Countries API base URL. */
export const httpClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
