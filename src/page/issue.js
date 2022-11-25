import {getIssueTpl, getIssueItemTpl} from '../template/tpl';
import {pipe, compose} from '../util/operator';
import {activateTabClass, openCountSelector, closeCountSelector, openIssueTabSelector,closeIssueTabSelector, issueContainerSelector, selectPageContainerSelector} from '../template/selector';
import {issueStore$,statusStore$, activatedIssuesStore$ } from '../store/issue.js'
import {$, addClass, removeClass, clearElement, renderPageInApp, setRenderTarget, toggleClass} from '../util/dom';
import {OPEN, CLOSE} from '../const';
import { IssueHttpService } from '../util/httpService';

const clickTabHandler = (status) => () => statusStore$.setValue(status);

export class IssuePage {
  #unsubscribeList = {
    issues: [],
    status: [],
    activatedIssues: [],
  };

  constructor() {
    this.apiService = new IssueHttpService(issueStore$);
    this.render();
  }

  destroy() {
    issueStore$.removeWatchers(this.#unsubscribeList.issues);
    statusStore$.removeWatchers(this.#unsubscribeList.status);
    activatedIssuesStore$.removeWatchers(this.#unsubscribeList.activatedIssues);
  }

  async fetchIssues() {
    const data = await this.apiService.getIssues();
    issueStore$.setValue(data);
  }
  
  /**
   * add event listener
   */
  addIssueTabClickListener() {
    $(openIssueTabSelector).addEventListener('click', clickTabHandler(OPEN));
    $(closeIssueTabSelector).addEventListener('click', clickTabHandler(CLOSE));
  }

  activateTab(value) {
    const deactivate = removeClass(activateTabClass);
    const activate = addClass(activateTabClass);

    if (value === OPEN) {
      activate($(openIssueTabSelector));
      deactivate($(closeIssueTabSelector));
    } else if (value === CLOSE) {
      activate($(closeIssueTabSelector));
      deactivate($(openIssueTabSelector));
    }
  }

  /**
   * watcher
   */
  registerIssueWatcher() {
    const _renderOpenCloseCount = this.renderOpenCloseCount.bind(this);

    this.#unsubscribeList.issues.push(_renderOpenCloseCount);
    issueStore$.addWatchers([_renderOpenCloseCount]);
  }

  registerIssueStatusWatcher() {
    const _activateTab = this.activateTab.bind(this);

    this.#unsubscribeList.status.push(_activateTab);
    statusStore$.addWatchers([_activateTab]);
  }

  registerActivatedIssuesWatcher() {
    const _renderIssues = this.renderIssues.bind(this);

    this.#unsubscribeList.activatedIssues.push(_renderIssues);
    activatedIssuesStore$.addWatchers([_renderIssues])
  }

  registerWatcher() {
    this.registerIssueWatcher();
    this.registerIssueStatusWatcher();
    this.registerActivatedIssuesWatcher();
  }

  /**
   * render
   */
  renderIssues(issues) {
    clearElement(issueContainerSelector);
    
    const renderIssue = setRenderTarget($(issueContainerSelector));
    issues.forEach(issue => compose(renderIssue, getIssueItemTpl)(issue));
  }

  renderOpenCloseCount(issues) {
    const getfilteredLength = (issues) => status => issues.filter(issue => issue.status === status).length;
    const getFilteredLengthByStatus = getfilteredLength(issues);
  
    $(openCountSelector).textContent = getFilteredLengthByStatus(OPEN);
    $(closeCountSelector).textContent = getFilteredLengthByStatus(CLOSE);
  }

  render() {
    const renderWrapper = () => renderPageInApp(getIssueTpl());
    const renderActivatedTab = () => this.activateTab(statusStore$.getValue());

    const initialRenderPipe = pipe(
      renderWrapper,
      renderActivatedTab,
      this.addIssueTabClickListener
    );
    
    const initialStorePipe = pipe(
      () => this.registerWatcher(),
      this.fetchIssues.bind(this)
    );
  
    pipe(initialRenderPipe, initialStorePipe)();
  }
}