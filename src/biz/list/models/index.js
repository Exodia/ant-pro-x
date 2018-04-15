import {fetchItems} from '../services'
import {switchActionReducer, spreadReducer, createErrorReducer} from 'common/util';

const FETCH = 'list/cardList/fetch';
const LOADING = 'list/cardList/fetching';
const ERROR = 'list/cardList/error';

const initialState = {
  entities: [],
  loading: false,
  error: null
};

export const fetchList = data => async dispatch => {
  dispatch({
    type: LOADING,
    loading: true
  });

  try {
    dispatch({
      type: FETCH,
      payload: {
        entities: await fetchItems(data)
      }
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
      loading: false
    });
  }
};

export default createErrorReducer(
  switchActionReducer(spreadReducer, [FETCH, LOADING], initialState)
);
