
import Store from './store';

export const GET_LABELS = 'GET_LABElS';
export const SET_LABELS = 'SET_LABELS';
export const SET_LABEL_COLOR = 'SET_LABEL_COLOR';
export const SET_LABEL_FORM_VALUE = 'SET_LABEL_FORM_VALUE';
export const CLEARE_FORM = 'CLEARE_FORM';


const reducer = (state, action) => {
    switch (action.type) {
    case GET_LABELS:
        return {
            ...state,
            labels: [...action.payload],
        };
    case SET_LABELS:
        return {
            ...state,
            labels: action.payload,
        };
    case SET_LABEL_FORM_VALUE:
        return {
            ...state,
            labelForm: {...state.labelForm, ...{[action.payload.id]: action.payload.value}},
        };
    case SET_LABEL_COLOR:
        return  {
            ...state, 
            labelForm: {
                ...state.labelForm,
                labelColorValue: action.payload
            } 
        };
    case CLEARE_FORM:
        return {
            ...state,
            labelForm: {
                labelNameInput: '',
                labelDescriptionInput: '',
                labelColorValue: '',
            }
        }
    };

};

const initialState = {
  labels: [],
  label: {
    name: '',
    description: '',
    color: '',
  },
  labelForm: {
    labelNameInput: '',
    labelDescriptionInput: '',
    labelColorValue: '',
  }
};

const labelStore = Store.createStore(initialState, reducer);

export default labelStore;