import React from 'react';
import {Route} from 'react-router-dom';

export function createFakeRoute(path) {
  return <Route exact path={path} component={() => <div>{path}</div>}/>;
}

export function retainSearchPath(path) {
  return `${path}${window.location.search}`;
}

export function switchActionReducer(reducer, actions, initialState) {
  return (state = initialState, action) => actions.includes(action.type) ? reducer(state, action) : state;
}


/**
 * 将 action creator 映射到 props 时，自动调用 dispatch
 *
 * @param {Object} actionMaps prop名与action的键值对象
 * @return {function(*=): *}
 */
export function autoDispatch(actionMaps) {
  return dispatch => (
    Object.keys(actionMaps).reduce(
      (result, prop) => {
        result[prop] = (...args) => dispatch(actionMaps[prop](...args));
        return result;
      },
      {}
    )
  );
}
