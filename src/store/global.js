import Store from './store';

export const SET_CURRENT_PAGEG = 'SET_CURRENT_PAGE';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGEG:
      return {
        ...state,
        currentPage: action.payload,
      };
  }
};

const initialState = {
  currentPage: 'issue',
};

const globalStore = Store.createStore(initialState, reducer);

export default globalStore;
