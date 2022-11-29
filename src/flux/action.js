import { curry } from '../curry';
import { pipe } from '../fp';

export const createAction = curry((name, payload) => ({ name, payload }));
export const createActionsFrom = actionNames => (
  Object.entries(actionNames)
    .reduce((prev, [key, value]) => ({ ...prev, [key]: pipe(createAction(value)) }), {})
);
export const actionNames = {
  setPage: 'setPage',
  setLabels: 'setLabels',
  setIssues: 'setIssues',
  appendIssues: 'appendIssues',
  appendLabels: 'appendLabels',
  setIsLabelFormOpen: 'setIsLabelFormOpen',
  setLabelForm: 'setLabelForm',
  showToastMessage: 'showToastMessage',
  hideToastMessage: 'hideToastMessage',
};
export const actions = createActionsFrom(actionNames);
