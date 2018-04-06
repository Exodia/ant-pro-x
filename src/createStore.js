import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux';
import {createLogger} from 'redux-logger';

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default function create() {
  const store = createStore(rootReducer, applyMiddleware(...middleware));
  return store;
}
