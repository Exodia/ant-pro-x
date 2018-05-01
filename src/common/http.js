/**
 * @file http.js http service
 * @author exodia(d_xinxin@163.com)
 */
import axios from 'axios';
import qs from 'qs';
import omitBy from 'lodash/omitBy';

const IS_DEV = process.env.NODE_ENV === 'development';
const USE_MOCK = !!process.env.REACT_APP_MOCK;

const http = axios.create({
  baseURL: USE_MOCK || window.location.search.includes('__mock__') ? '/mock/api' : '/api',
  timeout: 15 * 1000,
  paramsSerializer(params) {
    return qs.stringify(params, {arrayFormat: 'repeat'})
  }
});

if (IS_DEV) {
  http.interceptors.request.use(request => {
    console.log('request start:', request);
    return new Promise(resolve => USE_MOCK
      ? resolve(request) : setTimeout(resolve, 1000, request));
  });
}

const keyMap = new Map([
  ['page', '_page'],
  ['current', '_page'],
  ['pageSize', '_limit'],
  ['sort', '_sort'],
  ['order', '_order']
]);

const valueMap = new Map([
  ['descend', 'desc'],
  ['ascend', 'asc']
]);

http.interceptors.request.use(request => {
  const {params} = request;
  if (!params) {
    return request;
  }

  for (const [origin, mapped] of keyMap) {
    if (origin in params) {
      params[mapped] = valueMap.get(params[origin]) || params[origin];
      delete params[origin];
    }
  }

  request.params = omitBy(request.params, v => v === '' || v === undefined);

  return request;
});


/*
response schema:
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
 */
// 适配下json-server
http.interceptors.response.use(
  response => {
    if ('x-total-count' in response.headers) {
      response.data = {
        total: +response.headers['x-total-count'],
        entities: response.data
      }
    }
    return response;
  }
);

http.interceptors.response.use(
  response => response.data,
  error => {
    if (IS_DEV) {
      console.error('request error:', error);
    }

    return Promise.reject(error);
  }
);

export default http;
