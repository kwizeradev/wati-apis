import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

export const http = axios.create({
  baseURL: apiBaseUrl ?? 'http://localhost:4000',
  timeout: 30_000,
});
