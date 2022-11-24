import { getIssueItemTpl } from '~/tpl.js';
import { renderInnerHtml } from '~/utils/dom';
import { makeTemplate } from '~/utils/page';
import { ISSUE_LIST_SELECTOR } from '~/constants/selector';
import { getElement } from '~/store/element-store';
import { setIssuesToRenderWatcher } from '~/store/issue-store';
import type { Issue } from '~/types/issue';

const render = ({ parent, issues }: { issues: Issue[], parent: Element | null }): void => {
  renderInnerHtml({
    parent,
    html: makeTemplate({ arr: issues, templateFunc: getIssueItemTpl })
  });
};

export const initIssueListComponent = ({ parentSelector = ISSUE_LIST_SELECTOR }: { parentSelector?: string }): void => {
  setIssuesToRenderWatcher((issues: Issue[]) => {
    render({ parent: getElement({ selector: parentSelector }), issues });
  });
};
