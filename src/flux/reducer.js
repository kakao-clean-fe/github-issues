import { actionNames } from './action';

export function reducer(state, action) {
  const { name, payload } = action;
  switch (name) {
    case actionNames.setPage:
      return { ...state, page: payload };
    case actionNames.appendIssues:
      return { ...state, issues: [...issues, payload] };
    case actionNames.appendLabels:
      return { ...state, labels: [...labels, payload] };
    case actionNames.setIssues:
      return { ...state, issues: payload };
    case actionNames.setLabels:
      return { ...state, labels: payload };
    case actionNames.setIsLabelFormOpen:
      return { ...state, isLabelFormOpen: payload };
    case actionNames.setLabelForm:
      return { ...state, labelForm: { ...state.labelForm, ...payload } };
    case actionNames.showToastMessage:
      return { ...state, toast: { ...state.toast, ...payload, isOpen: true } };
    case actionNames.hideToastMessage:
      return { ...state, toast: { ...state.toast, ...payload, isOpen: false } };
    default:
      console.error(`Invalid action name(${name})`)
      return state;
  }
}
