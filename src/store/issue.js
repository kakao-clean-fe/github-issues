import {store, createDerivedStore} from './default.js';

/**
 * issue store 관련
 */
export const issueStore$ = store([]);
export const statusStore$ = store('open');

const getActivatedIssues = (issues, status) => {
  return issues.filter(issue => issue.status === status);
}

export const activatedIssuesStore$ = createDerivedStore(getActivatedIssues, issueStore$, statusStore$);
