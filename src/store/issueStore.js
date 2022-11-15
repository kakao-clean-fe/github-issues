import Store from './store';

export const SET_ISSUE_LIST = 'SET_ISSUE_LIST';
export const SET_OPEN_COUNT = 'SET_OPEN_COUNT';
export const SET_CLOSE_COUNT = 'SET_CLOSE_COUNT';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ISSUE_LIST:
      return {
        ...state,
        issueList: [...action.payload],
      };
    case SET_OPEN_COUNT:
      return {
        ...state,
        openCount: action.payload,
      };
    case SET_CLOSE_COUNT:
      return {
        ...state,
        closeCount: action.payload,
      };
    case SET_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload,
      };
  }
};

const initialState = {
  issueList: [],
  openCount: 0,
  closeCount: 0,
  currentTab: 'open',
};

const issueStore = Store.createStore(initialState, reducer);

export default issueStore;
