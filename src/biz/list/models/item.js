import {queryItems} from '../services'
import {switchActionReducer, spreadReducer, createErrorReducer} from 'common/util';

const FETCH = 'list/item/fetch';
const LOADING = 'list/item/fetching';
const ERROR = 'list/item/error';

const initialState = {
  entities: [],
  totalCount: 0,
  loading: false,
  error: null
};

export const fetchItems = data => async dispatch => {
  dispatch({
    type: LOADING,
    payload: {
      loading: true
    }
  });

  try {
    dispatch({
      type: FETCH,
      payload: await queryItems(data)
    })
  }
  catch (e) {
    dispatch({
      type: ERROR,
      payload: e,
      error: true
    });
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
  switchActionReducer(spreadReducer, [FETCH, LOADING], initialState)
);
