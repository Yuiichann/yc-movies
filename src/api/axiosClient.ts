import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

export interface Params {
  page: number;
}

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-type': 'Application/json',
  },
  paramsSerializer: (params: Params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
