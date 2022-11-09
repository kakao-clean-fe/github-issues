import { getIssueItemTpl } from '~/tpl.js';
import { renderInnerHtml } from '~/utils/dom';
import { reduceArray } from '~/utils/array';
import { ISSUE_LIST_SELECTOR } from '~/constants/selector';
import { getElement } from '~/store/element-store';
import { setIssuesToRenderWatcher } from '~/store/issue-store';
import type { Issue } from '~/types/issue';

const makeIssueTemplate = ({ issues, templateFunc }: { issues: Issue[], templateFunc: (issue: Issue) => string }): string => {
  return reduceArray({
    arr: issues,
    initValue: '',
    reducer: (template: string, issue: Issue) => `${template}${templateFunc(issue)}`
  });
};

const render = ({ parent, issues }: { issues: Issue[], parent: Element | null }): void => {
  renderInnerHtml({
    parent,
    html: makeIssueTemplate({ issues, templateFunc: getIssueItemTpl })
  });
};

export const initIssueListComponent = ({ parentSelector = ISSUE_LIST_SELECTOR }: { parentSelector?: string }): void => {
  setIssuesToRenderWatcher((issues: Issue[]) => {
    render({ parent: getElement(parentSelector), issues });
  });
};
