import type { Issue, Status } from '~/types/issue';
import { filterArray } from '~/utils/array';

const filterIssueByStatus = ({ issues, status }: { issues: Issue[], status: Status }): Issue[] => {
  return filterArray({ arr: issues, filterFunc: (issue: Issue) => issue.status === status });
};

const setStatusToFilterIssue = (status: Status) => (issues: Issue[]) => filterIssueByStatus({ issues, status });

export const filterOpenedIssues = setStatusToFilterIssue('open');

export const filterClosedIssues = setStatusToFilterIssue('close');
