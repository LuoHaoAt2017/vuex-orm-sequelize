import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7001',
  timeout: 10000
});

instance.interceptors.request.use(function(req) {
  return req;
}, function(error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function(res) {
  return res.data;
}, function(error) {
  debugger
  return Promise.reject(error);
});

export default instance;