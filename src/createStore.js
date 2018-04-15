import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import user from './biz/user/models';
import navigator from './biz/navigator/models';
import list from './biz/list/models';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const rootReducer = combineReducers({
  user,
  navigator,
  list
});

export default function create() {
  const store = createStore(rootReducer, applyMiddleware(...middleware));
  return store;
}
