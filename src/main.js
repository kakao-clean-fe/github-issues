import {getIssueTpl, getIssueItemTpl, openCountSelector, closeCountSelector, openIssueTabSelector, closeIssueTabSelector, issueContainerSelector, activateTabClass} from './tpl';
import {$, clearElement, setRenderTarget, compose, pipe, removeClass, addClass} from './util/componentUtil';
import {issueStore$,statusStore$, activatedIssuesStore$, loadIssueData } from './store.js'

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

const activateTab = (status) => {
  const removeTabClass = removeClass(activateTabClass)
  const addTabClass = addClass(activateTabClass);

  if (status === 'open') {
    addTabClass($(openIssueTabSelector))
    removeTabClass($(closeIssueTabSelector))
  } else if (status === 'close') {
    addTabClass($(closeIssueTabSelector))
    removeTabClass($(openIssueTabSelector))
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