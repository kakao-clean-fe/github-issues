import {getIssueTpl, getIssueItemTpl} from './template/tpl';
import {activateTabClass, navIssueSelector, navLabelSelector, openCountSelector, closeCountSelector, openIssueTabSelector,closeIssueTabSelector, issueContainerSelector} from './template/selector';
import {$, clearElement, setRenderTarget, toggleClass} from './util/dom';
import { LABEL_PAGE, ISSUE_PAGE, pageStore$,issueStore$,statusStore$, activatedIssuesStore$, loadIssueData } from './store/issue.js'
import {initLabelPage} from './page/label';
import {pipe, compose} from './util/operator';

const renderOpenCloseCount = (issues) => {
  const getfilteredLength = (issues) => status => issues.filter(issue => issue.status === status).length;
  const getFilteredLengthByStatus = getfilteredLength(issues);

  $(openCountSelector).textContent = getFilteredLengthByStatus('open');
  $(closeCountSelector).textContent = getFilteredLengthByStatus('close');
}

/**
 * check if removeEventListener need
 */
const addIssueTabClickListener = () => {
  $(openIssueTabSelector).addEventListener('click', clickTabHandler('open'));
  $(closeIssueTabSelector).addEventListener('click', clickTabHandler('close'));
}

const clickTabHandler = (status) => () => statusStore$.setValue(status);

const renderIssues = (issues) => {
  clearElement(issueContainerSelector);
  
  const renderIssue = setRenderTarget($(issueContainerSelector));
  issues.forEach(issue => compose(renderIssue, getIssueItemTpl)(issue));
}

const activateTab = () => {
  const toggleActiveTab = toggleClass(activateTabClass);
  
  toggleActiveTab($(openIssueTabSelector));
  toggleActiveTab($(closeIssueTabSelector));
}

const registerWatcher = () => {
  registerIssueWatcher();
  registerIssueStatusWatcher();
  registerActivatedIssuesWatcher();
}

const registerIssueWatcher = () => {
  issueStore$.addWatchers([renderOpenCloseCount])
}
const registerIssueStatusWatcher = () => {
  statusStore$.addWatchers([activateTab]);
}

const registerActivatedIssuesWatcher = () => {
  activatedIssuesStore$.addWatchers([renderIssues])
}

/**
 * render page
 */
const renderIssuePage = () => {
  const renderWrapper = compose(setRenderTarget($('#app')), getIssueTpl); // render wrapper
  const initialRenderPipe = pipe(renderWrapper, addIssueTabClickListener);
  const initialStorePipe = pipe(
    registerWatcher,
    loadIssueData,
  );

  pipe(initialRenderPipe, initialStorePipe)();
};

const renderPage = (page) => {
  clearElement('#app');

  page === ISSUE_PAGE ? renderIssuePage() : initLabelPage();
}

const registerPageStoreWather = () => {
  pageStore$.addWatchers([renderPage]);
}


// decide rendering issue page or label page
const clickPageHandler = (page) => () => pageStore$.setValue(page);
const addRenderPageClickListener = () => {
  $(navIssueSelector).addEventListener('click', clickPageHandler(ISSUE_PAGE));
  $(navLabelSelector).addEventListener('click', clickPageHandler(LABEL_PAGE));
}

(function init() {
  registerPageStoreWather();
  addRenderPageClickListener();
  pageStore$.setValue(LABEL_PAGE);
})();