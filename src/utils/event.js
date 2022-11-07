import { selectAllElement, selectElement } from './render';
import { pipe } from './pipe';
import { SELECTOR } from '../constants/selector';
import { CLOSED, OPEN } from '../constants/status';
import { EVENT } from '../constants/event';
import { updateIssuesTemplate, updateIssueList } from './template';
import { getIssuesWithStatus } from './status';

export const bindEvent = selector => eventType => (...fn) => {
  const element = selectElement(selector);
  element.addEventListener(eventType, pipe(...fn));
}

export const setEventListener = issues => {
  const elements = selectAllElement(SELECTOR.STATUS_TAB);
  const OPEN_COUNT_CLASS = '_open_count'
  elements.forEach(element => {
    element.addEventListener(EVENT.CLICK, e => {
      const status = e.target.classList.contains(OPEN_COUNT_CLASS) ? OPEN : CLOSED;
      const clickedIssues = getIssuesWithStatus(issues, status);
      const openIssueCount = getIssuesWithStatus(issues, OPEN).length;
      const closedIssueCount = getIssuesWithStatus(issues, CLOSED).length;
      updateIssuesTemplate(openIssueCount, closedIssueCount, status);
      updateIssueList(clickedIssues);
    });
  });
}