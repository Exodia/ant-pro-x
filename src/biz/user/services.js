import http from '../../common/http';

export const getUserList = () => http.get('/users');

export const login = data => http.post('/login/account', data);
