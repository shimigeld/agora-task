import axios from 'axios';

/** Shared axios instance configured for the Rest Countries API. */
export const httpClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
