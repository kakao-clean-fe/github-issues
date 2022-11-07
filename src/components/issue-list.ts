import { getIssueItemTpl } from '~/tpl.js';
import { findParentAndRenderInnerHtml } from '~/utils/dom';
import { reduceArray } from '~/utils/array';
import { ISSUE_LIST_SELECTOR } from '~/constants/selector';
import type { Issue } from '~/types/issue';

const makeIssueTemplate = ({ issues, templateFunc }: { issues: Issue[], templateFunc: (issue: Issue) => string }): string => {
  return reduceArray({
    arr: issues,
    initValue: '',
    reducer: (template: string, issue: Issue) => `${template}${templateFunc(issue)}`
  });
};

const render = ({ parentSelector, issues }: { issues: Issue[], parentSelector: string }): void => {
  findParentAndRenderInnerHtml({
    selector: parentSelector,
    html: makeIssueTemplate({ issues, templateFunc: getIssueItemTpl })
  });
};

export const IssueList = ({ parentSelector = ISSUE_LIST_SELECTOR, issues }: { issues: Issue[], parentSelector?: string }): void => {
  render({ parentSelector, issues });
};
