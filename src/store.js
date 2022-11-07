import {store, createDerivedStore, fetchData} from './util/storeUtil.js';

export const issueStore$ = store([]);
export const statusStore$ = store('open');

const getActivatedIssues = (issues, status) => {
  return issues.filter(issue => issue.status === status);
}

export const activatedIssuesStore$ = createDerivedStore(getActivatedIssues, issueStore$, statusStore$);

/** fetch and store data */
export const loadIssueData = () => fetchData('../data-sources/issues.json')(issueStore$);