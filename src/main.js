import {getIssueItemTpl, getIssueTpl} from "./tpl.js";

const pipe = (...args) => (val) => {
    args.reduce((acc, curr) => curr(acc), val)
}
class Observable {
    constructor() {
        this.value = undefined;
        this.callbacks = [];
    }
    next(nextValue) {
        this.callbacks.forEach((fn) => fn(nextValue));
        this.value = nextValue;
    }
    subscribe(callbackFn) {
        this.callbacks.push(callbackFn);
    }
    getValue() {
        return this.value;
    }
}

// Fetch 함수
const fetchLabels = () => fetch('/data-sources/labels.json').then(res => res.json());
const fetchIssues = () => fetch('/data-sources/issues.json').then(res => res.json());

const filterOpened = (issues) => issues.filter(({status}) => status === "open");
const filterClosed = (issues) => issues.filter(({status}) => status === "close");

const htmlToElement = (html) => {
    html = html.trim();
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

// Render 함수
const renderIssue = pipe(
  getIssueItemTpl,
  htmlToElement,
  (issueElement) => document.querySelector('.issue-list ul').appendChild(issueElement),
);

const renderIssueTemplate = () => document.getElementById('app').innerHTML = getIssueTpl();
const renderIssues = (issues) => {
    document.querySelector('.issue-list ul').innerHTML = '';
    issues.forEach(renderIssue);
}
const renderOpenedNum = (openedNum) => document.getElementsByClassName('open-count')[0].innerText = openedNum + ' Opened';
const renderClosedNum = (closedNum) => document.getElementsByClassName('close-count')[0].innerText = closedNum + ' Closed';

// data fetch 구독
const issues$ = new Observable();
issues$.subscribe(renderIssues);
issues$.subscribe(
  pipe(
    filterOpened,
    issues => issues.length,
    renderOpenedNum,
  )
);
issues$.subscribe(
  pipe(
    filterClosed,
    issues => issues.length,
    renderClosedNum,
  )
);

// button clickevent 구독
const clickOpened$ = new Observable();
clickOpened$.subscribe(
  pipe(
    () => issues$.getValue(),
    filterOpened,
    renderIssues
  )
);

const clickClosed$ = new Observable();
clickClosed$.subscribe(
  pipe(
    () => issues$.getValue(),
    filterClosed,
    renderIssues
  )
);

renderIssueTemplate();
fetchIssues().then(issues$.next.bind(issues$));
document.getElementsByClassName('open-count')[0].addEventListener('click', () => clickOpened$.next());
document.getElementsByClassName('close-count')[0].addEventListener('click', () => clickClosed$.next());
