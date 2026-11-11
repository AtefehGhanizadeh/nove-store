import axios from 'axios';
import { handleApiError } from '@/api/handleApiError';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(handleApiError(error)),
);
