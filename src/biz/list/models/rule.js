import {queryRules, removeRules, addRule} from '../services';
import {switchActionReducer, spreadReducer, createErrorReducer} from 'common/util';


const REMOVING = 'list/rule/removing';
const FETCHING = 'list/rule/fetching';
const CREATING = 'list/rule/creating';

const FETCH = 'list/rule/fetch';
const ERROR = 'list/rule/error';
const COMPLETE = 'list/rule/complete';

const initialState = {
  entities: [],
  total: 0,
  loading: false,
  error: null
};

export const fetchRules = data => async dispatch => {
  dispatch({
    type: FETCHING,
    payload: {
      loading: true
    }
  });

  try {
    dispatch({
      type: FETCH,
      payload: await queryRules(data)
    })
  }
  catch (e) {
    console.error(e);
    dispatch({
      type: ERROR,
      payload: e,
      error: true
    });
  }
  finally {
    dispatch({
      type: COMPLETE,
      payload: {
        loading: false
      }
    });
  }
};

export const batchModify = ({type, items}, success, fail) => async dispatch => {
  dispatch({
    type: REMOVING,
    payload: {
      loading: true
    }
  });

  try {
    switch (type) {
      case 'remove':
        await removeRules(items.map(item => item.id));
        success && success();
        break;
      default:
        break;
    }
  }
  catch (e) {
    fail && fail(e);
  }
  finally {
    dispatch({
      type: COMPLETE,
      payload: {
        loading: false
      }
    });
  }

};

export const createRule = (data, success, fail) => async dispatch => {
  dispatch({
    type: CREATING,
    payload: {
      loading: true
    }
  });

  try {
    data = await addRule(data);
    success && success(data);
  }
  catch (e) {
    fail && fail(e);
  }
  finally {
    dispatch({
      type: COMPLETE,
      payload: {
        loading: false
      }
    });
  }
};

export default createErrorReducer(
  switchActionReducer(spreadReducer, [FETCH, FETCHING, COMPLETE], initialState)
);
