import {pipe, tab, filter, forEach} from './helpers/fp-helpers.js';
import {renderIssuesClear, renderIssue, renderOpenedNum, renderClosedNum, openedButtonElement, closedButtonElement} from './issue-renderer.js'
import {Observable} from "./helpers/observable.js";
import {fetchIssues} from './api/fetch.js';

export function initIssuePage() {
  const issues$ = new Observable();
  const clickOpened$ = new Observable();
  const clickClosed$ = new Observable();
  issues$.subscribe(
    pipe(
      tab(renderIssuesClear),
      forEach(renderIssue),
    )
  );
  issues$.subscribe(
    pipe(
      filter(({status}) => status === "open"),
      issues => issues.length,
      renderOpenedNum,
    )
  );
  issues$.subscribe(
    pipe(
      filter(({status}) => status === "close"),
      issues => issues.length,
      renderClosedNum,
    )
  );
  clickOpened$.subscribe(
    pipe(
      () => issues$.getValue(),
      filter(({status}) => status === "open"),
      tab(renderIssuesClear),
      forEach(renderIssue),
    )
  );
  clickClosed$.subscribe(
    pipe(
      () => issues$.getValue(),
      filter(({status}) => status === "close"),
      tab(renderIssuesClear),
      forEach(renderIssue),
    )
  );

  fetchIssues().then((issues) => issues$.next(issues));
  openedButtonElement.addEventListener('click', () => clickOpened$.next());
  closedButtonElement.addEventListener('click', () => clickClosed$.next());
}
