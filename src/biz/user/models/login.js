import {login} from '../services'
import {switchActionReducer, spreadReducer, createErrorReducer} from 'common/util';

const LOGIN = 'user/login/login';
const LOGOUT = 'user/login/logout';
const LOADING = 'user/login/loading';
const ERROR = 'user/login/error';

const initialState = {
  type: 'account',
  loading: false,
  error: null
};

export const doLogin = (data, success) => async dispatch => {
  dispatch({
    type: LOADING,
    payload: {
      loading: true,
      type: data.type
    }
  });

  try {
    success(await login(data));
  }
  catch (e) {
    dispatch({
      type: ERROR,
      payload: e,
      error: true
    })
  }
  finally {
    dispatch({
      type: LOADING,
      payload: {
        loading: false
      }
    });
  }
};

export default createErrorReducer(
  switchActionReducer(spreadReducer, [LOGIN, LOGOUT, LOADING], initialState)
);
