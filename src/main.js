import {getIssueTpl, getIssueItemTpl, openCountSelector, closeCountSelector, openIssueTabSelector, closeIssueTabSelector, issueContainerSelector, activateTabClass} from './tpl';
import {renderTemplate, getPromiseData, $, clearElement} from './util';
import store from './store.js'

const getIssueData = async () => {
  const issues = await getPromiseData('../data-sources/issues.json');
  
  store.setIssues(issues);
  
  return issues;
}

const renderOpenCloseCount = () => {
  $(openCountSelector).textContent = store.getOpenIssues().length;
  $(closeCountSelector).textContent = store.getCloseIssues().length;
}

/**
 * check if removeEventListener need
 */
const addIssueTabClickListener = () => {
  $(openIssueTabSelector).addEventListener('click', clickOpenTabHandler);
  $(closeIssueTabSelector).addEventListener('click', clickCloseTabHandler);
}

const clickOpenTabHandler = () => {
  store.setActivatedStatus('open');
}

const clickCloseTabHandler = () => {
  store.setActivatedStatus('close');
}

const renderIssues = () => {
  clearElement(issueContainerSelector);

  store.getActivatedStatusIssues().forEach(issue => renderIssue(issue));
}

const renderIssue = (issue) => {
  renderTemplate($(issueContainerSelector), getIssueItemTpl(issue))
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

const registerAllIssuesWatcher = () => {
  store.addAllIssuesWatchers([renderOpenCloseCount]);
}

const registerIssueStatusWatcher = () => {
  store.addStatusWatchers([renderIssues, activateTab]);
}

const init = async () => {
  const app = $('#app');
  
  renderTemplate(app, getIssueTpl()); // render wrapper
  registerAllIssuesWatcher();
  registerIssueStatusWatcher();

  // init render Issues
  await getIssueData();
  store.setActivatedStatus('open'); // set initial state
  addIssueTabClickListener();
}

init();