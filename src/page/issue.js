import {getIssueTpl, getIssueItemTpl} from '../template/tpl';
import {pipe, compose} from '../util/operator';
import {activateTabClass, openCountSelector, closeCountSelector, openIssueTabSelector,closeIssueTabSelector, issueContainerSelector, selectPageContainerSelector} from '../template/selector';
import {issueStore$,statusStore$, activatedIssuesStore$, loadIssueData } from '../store/issue.js'
import {$, clearElement, setRenderTarget, toggleClass} from '../util/dom';
import {OPEN, CLOSE} from '../const';

const clickTabHandler = (status) => () => statusStore$.setValue(status);

export const issuePage = {
  /**
   * add event listener
   */
  addIssueTabClickListener() {
    $(openIssueTabSelector).addEventListener('click', clickTabHandler(OPEN));
    $(closeIssueTabSelector).addEventListener('click', clickTabHandler(CLOSE));
  },
  activateTab() {
    const toggleActiveTab = toggleClass(activateTabClass);
    
    toggleActiveTab($(openIssueTabSelector));
    toggleActiveTab($(closeIssueTabSelector));
  },
  /**
   * watcher
   */
  registerIssueWatcher() {
    issueStore$.addWatchers([this.renderOpenCloseCount]);
  },
  registerIssueStatusWatcher() {
    statusStore$.addWatchers([this.activateTab]);
  },
  registerActivatedIssuesWatcher() {
    activatedIssuesStore$.addWatchers([this.renderIssues])
  },
  registerWatcher() {
    this.registerIssueWatcher();
    this.registerIssueStatusWatcher();
    this.registerActivatedIssuesWatcher();
  },
  /**
   * render
   */
  renderIssues(issues) {
    clearElement(issueContainerSelector);
    
    const renderIssue = setRenderTarget($(issueContainerSelector));
    issues.forEach(issue => compose(renderIssue, getIssueItemTpl)(issue));
  },
  renderOpenCloseCount(issues) {
    const getfilteredLength = (issues) => status => issues.filter(issue => issue.status === status).length;
    const getFilteredLengthByStatus = getfilteredLength(issues);
  
    $(openCountSelector).textContent = getFilteredLengthByStatus('open');
    $(closeCountSelector).textContent = getFilteredLengthByStatus('close');
  },
  render() {
    const renderWrapper = compose(setRenderTarget($('#app')), getIssueTpl); // render wrapper
    const initialRenderPipe = pipe(renderWrapper, this.addIssueTabClickListener);
    const initialStorePipe = pipe(
      () => this.registerWatcher(),
      loadIssueData,
    );
  
    pipe(initialRenderPipe, initialStorePipe)();
  }
}