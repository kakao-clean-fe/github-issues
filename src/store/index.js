import {createStore} from './redux.js';
import * as request from "../requests.js";
import {CLOSE, OPEN} from "../const.js";

export const ISSUE_TAB = 'issueTab';
export const LABEL_TAB = 'labelTab';
export const GET_ISSUES = 'getIssues';
export const GET_LABELS = 'getLabels';

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
        const issues = await request.get('/data-sources/issues.json');
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
        const labels = await request.get('/data-sources/labels.json');
        return {
          ...state,
          labels
        }
      } catch (e) {
        console.error(e);
        return state;
      }
  }

  return state;
}

const store = createStore(initialState, reducer);
export default store;

