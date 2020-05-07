import axios from 'axios';
import axiosMiddlewareFactory from 'redux-axios-middleware';

import AppConfig from '@config/AppConfig';

const axiosClient = axios.create({
  baseURL: AppConfig.apiUrl,
  responseType: 'json',
});

const axiosMiddlewareOptions = {
  interceptors: {
    request: [
      // ({ getState }, request) => {
      //   const state = getState();
      //   const token = getToken(state);
      //   if (token) {
      //     request.headers.authorization = `Bearer ${token}`;
      //   }
      //   return request;
      // },
    ],
  },
};

const axiosMiddleware = axiosMiddlewareFactory(
  axiosClient,
  axiosMiddlewareOptions,
);

export default axiosMiddleware;
