import http from '../../common/http';
import omit from 'lodash/omit';

export const queryItems = params => http.get('/items', {params});

export const queryRules = (params = {}) => {
  if (params.no) {
    params = {
      ...omit(params, 'no'),
      no_like: params.no
    };
  }
  return http.get('/rules', {params})
};

// json-server 不支持批量delete，用post模拟下
export const removeRules = id => http.post('/deletedRules', {id});

export const addRule = params => http.post('/rules', params);
