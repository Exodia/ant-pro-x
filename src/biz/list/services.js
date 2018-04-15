import http from '../../common/http';

export const fetchItems = params => http.get('/items', {params});
