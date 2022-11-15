import Store from './store';

export const SET_LABEL_LIST = 'SET_LABEL_LIST';
export const SET_LABEL_ITEM = 'SET_LABEL_ITEM';
export const ADD_LABEL = 'ADD_LABEL';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LABEL_LIST:
      return {
        ...state,
        labelList: [...action.payload],
      };
    case SET_LABEL_ITEM:
      return {
        ...state,
        labelItem: { ...action.payload },
      };
    case ADD_LABEL:
      return {
        ...state,
        labelList: [...state.labelList, state.labelItem],
      };
  }
};

const initialState = {
  labelList: [],
  labelItem: {
    name: '',
    description: '',
    color: '',
  },
};

const labelStore = Store.createStore(initialState, reducer);

export default labelStore;
