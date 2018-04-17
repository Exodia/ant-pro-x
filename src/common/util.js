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
