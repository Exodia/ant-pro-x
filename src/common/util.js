export const retainSearchPath = path => `${path}${window.location.search}`;

export const switchActionReducer = (reducer, actions, initialState) => (
  (state = initialState, action) => actions.includes(action.type) ? reducer(state, action) : state
);

export const createErrorReducer = reducer => (
  (state, action) => action.error === true
    ? {...state, error: action.payload}
    : reducer(state, action)
);

export const spreadReducer = (state, {payload}) => ({...state, ...payload});


/**
 * 将 action creator 映射到 props 时，自动调用 dispatch
 *
 * @param {Object} actionMaps prop名与action的键值对象
 * @return {function(*=): *}
 */
export const autoDispatch = actionMaps => dispatch => (
  Object.keys(actionMaps).reduce(
    (result, prop) => {
      result[prop] = (...args) => dispatch(actionMaps[prop](...args));
      return result;
    },
    {}
  )
);
