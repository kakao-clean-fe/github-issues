import {getIssueTpl, getIssueItemTpl, openCountSelector, closeCountSelector, openIssueTabSelector, closeIssueTabSelector, issueContainerSelector, activateTabClass} from './tpl';
import {$, clearElement, setRenderTarget, compose, pipe} from './util/componentUtil';
import {issueStore$,statusStore$, activatedIssuesStore$, loadIssueData } from './store.js'

const getOpenIssues = (issues) => {
  return issues.filter(issue => issue.status === 'open');
}

const getCloseIssues = (issues) => {
  return issues.filter(issue => issue.status === 'close');
}

const renderOpenCloseCount = (issues) => {
  $(openCountSelector).textContent = getOpenIssues(issues).length;
  $(closeCountSelector).textContent = getCloseIssues(issues).length;
}

/**
 * check if removeEventListener need
 */
const addIssueTabClickListener = () => {
  $(openIssueTabSelector).addEventListener('click', clickOpenTabHandler);
  $(closeIssueTabSelector).addEventListener('click', clickCloseTabHandler);
}

const clickOpenTabHandler = () => {
  statusStore$.setValue('open')
}

const clickCloseTabHandler = () => {
  statusStore$.setValue('close')
}

const renderIssues = (issues) => {
  clearElement(issueContainerSelector);
  
  const renderIssue = setRenderTarget($(issueContainerSelector));
  issues.forEach(issue => compose(renderIssue, getIssueItemTpl)(issue));
}

const activateTab = (status) => {
  if (status === 'open') {
    $(openIssueTabSelector).classList.add(activateTabClass);
    $(closeIssueTabSelector).classList.remove(activateTabClass);
  } else if (status === 'close') {
    $(openIssueTabSelector).classList.remove(activateTabClass);
    $(closeIssueTabSelector).classList.add(activateTabClass);
  }
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

(function init() {
  const renderWrapper = compose(setRenderTarget($('#app')), getIssueTpl); // render wrapper
  const initialRenderPipe = pipe(renderWrapper, addIssueTabClickListener);
  const initialStorePipe = pipe(
    registerWatcher,
    loadIssueData,
  );

  pipe(initialRenderPipe, initialStorePipe)();
})();