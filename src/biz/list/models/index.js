import {combineReducers} from 'redux';
import item from './item';
import rule from './rule';

export * from './item';
export * from './rule';

export default combineReducers({item, rule});
