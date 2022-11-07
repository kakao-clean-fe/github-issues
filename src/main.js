import {pipe, tab, filter, forEach} from './fp-helpers.js';
import {renderIssuesClear, renderIssue, renderOpenedNum, renderClosedNum, openedButtonElement, closedButtonElement} from './renderer.js'
import {Observable} from "./observable.js";
import {fetchIssues} from './fetch.js';

// data fetch 구독
const issues$ = new Observable();
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

// button clickevent 구독
const clickOpened$ = new Observable();
clickOpened$.subscribe(
  pipe(
    () => issues$.getValue(),
    filter(({status}) => status === "open"),
    tab(renderIssuesClear),
    forEach(renderIssue),
  )
);

const clickClosed$ = new Observable();
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
