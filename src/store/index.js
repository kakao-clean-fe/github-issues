import {createStore} from './redux.js';
import * as request from "../utils/requests.js";
import {CLOSE, OPEN} from "../const.js";
import {AbortableRequest} from "../utils/requests.js";
import {getItemWithExpiry, setItemWithExpiry} from "../utils/expiryLocalStorage.js";

export const ISSUE_TAB = 'issueTab';
export const LABEL_TAB = 'labelTab';
export const GET_ISSUES = 'getIssues';
export const GET_LABELS = 'getLabels';
export const GET_UPDATED_LABELS = 'getUpdatedLabels';
export const POST_LABEL = 'postLabel';
export const POST_LABEL_SUCCESS = 'postLabelSuccess';
export const POST_LABEL_FAILED = 'postLabelFailed';

const initialState = {
  currentTab: ISSUE_TAB,
  issues: [],
  issueStatus: {
    open: [],
    close: []
  },
  labels: [],
};

async function reducer(state = {}, action) {
  switch (action.type) {
    case ISSUE_TAB:
      return {
        ...state,
        currentTab: ISSUE_TAB
      }
    case LABEL_TAB:
      return {
        ...state,
        currentTab: LABEL_TAB
      }
    case GET_ISSUES:
      try {
        const issues = await request.get('/issues');
        return {
          ...state,
          issues,
          issueStatus: {
            open: issues.filter(issue => issue?.status === OPEN),
            close: issues.filter(issue => issue?.status === CLOSE)
          }
        }
      } catch (e) {
        console.error(e);
        return state;
      }
    case GET_LABELS:
      try {
        const labels = await request.get('/labels');
        return {
          ...state,
          labels
        }
      } catch (e) {
        console.error(e);
        return state;
      }
    case GET_UPDATED_LABELS:
      const cachedLabels = getItemWithExpiry('labels');
      if (cachedLabels) {
        console.debug('cache hit');
        return {
          ...state,
          labels: JSON.parse(cachedLabels)
        }
      }

      try {
        const url = '/labels-delay';
        const abortRequest = new AbortableRequest();
        const labels = await abortRequest.get(url);

        // set cache expiry for 10 seconds
        setItemWithExpiry('labels', JSON.stringify(labels), 1000 * 10);
        return {
          ...state,
          labels
        };
      } catch (e) {
        console.error(e);
        return state;
      }
    case POST_LABEL:
      const {data} = action;
      if (!data) return state;

      try {
        const labels = await request.post('/labels', data);
        store.dispatch({
          type: POST_LABEL_SUCCESS
        });
        return {
          ...state,
          labels
        };
      } catch (e) {
        console.error(e);
        store.dispatch({
          type: POST_LABEL_FAILED
        });
        return state;
      }
    case POST_LABEL_SUCCESS:
    case POST_LABEL_FAILED:
      return state;
  }

  return state;
}

const store = createStore(initialState, reducer);
export default store;

