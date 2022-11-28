import {getIssueTpl, getIssueItemTpl} from '../template/tpl';
import {pipe, compose} from '../util/operator';
import {activateTabClass, openCountSelector, closeCountSelector, openIssueTabSelector,closeIssueTabSelector, issueContainerSelector, issueWrapperSelector} from '../template/selector';
import {issueStore$,statusStore$, activatedIssuesStore$ } from '../store/issue.js'
import {getTargetQuerySelector, addClass, removeClass, clearElement, setRenderTarget, renderWrapper } from '../util/dom';
import {OPEN, CLOSE} from '../const';
import { apiService } from '../util/httpService';
import {addSubscribe as _addSubscribe} from '../util/feature';

const clickTabHandler = (status) => () => statusStore$.setValue(status);

export class IssuePage {
  #issueWrapper$ = null;
  #unsubscribeList = [];

  constructor() {
    this.apiService = apiService;
    this.addSubscribe = _addSubscribe(this, this.#unsubscribeList);
  }

  destroy() {
    issueStore$.removeWatchers(this.#unsubscribeList);
    statusStore$.removeWatchers(this.#unsubscribeList);
    activatedIssuesStore$.removeWatchers(this.#unsubscribeList);
  }

  async fetchIssues() {
    try {
      const data = await this.apiService.getIssues();
      issueStore$.setValue(data);
    } catch(err) {}
  }
  
  /**
   * add event listener
   */
  addIssueTabClickListener() {
    this.#issueWrapper$(openIssueTabSelector).addEventListener('click', clickTabHandler(OPEN));
    this.#issueWrapper$(closeIssueTabSelector).addEventListener('click', clickTabHandler(CLOSE));
  }

  activateTab(value) {
    const deactivate = removeClass(activateTabClass);
    const activate = addClass(activateTabClass);

    if (value === OPEN) {
      activate(this.#issueWrapper$(openIssueTabSelector));
      deactivate(this.#issueWrapper$(closeIssueTabSelector));
    } else if (value === CLOSE) {
      activate(this.#issueWrapper$(closeIssueTabSelector));
      deactivate(this.#issueWrapper$(openIssueTabSelector));
    }
  }

  /**
   * watcher
   */
  registerIssueWatcher() {
    issueStore$.addWatchers([this.addSubscribe(this.renderOpenCloseCount)]);
  }

  registerIssueStatusWatcher() {
    statusStore$.addWatchers([this.addSubscribe(this.activateTab)]);
  }

  registerActivatedIssuesWatcher() {
    activatedIssuesStore$.addWatchers([this.addSubscribe(this.renderIssues)])
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
    
    const renderIssue = setRenderTarget(this.#issueWrapper$(issueContainerSelector));
    issues.forEach(issue => compose(renderIssue, getIssueItemTpl)(issue));
  }

  renderOpenCloseCount(issues) {
    const getfilteredLength = (issues) => status => issues.filter(issue => issue.status === status).length;
    const getFilteredLengthByStatus = getfilteredLength(issues);
  
    this.#issueWrapper$(openCountSelector).textContent = getFilteredLengthByStatus(OPEN);
    this.#issueWrapper$(closeCountSelector).textContent = getFilteredLengthByStatus(CLOSE);
  }

  render(targetEl) {
    const renderActivatedTab = () => this.activateTab(statusStore$.getValue());

    const initialRenderPipe = pipe(
      renderWrapper(targetEl)(getIssueTpl()),
      () => {(this.#issueWrapper$ = getTargetQuerySelector(targetEl)(issueWrapperSelector))},
      renderActivatedTab,
      this.addIssueTabClickListener.bind(this)
    );
    
    const initialStorePipe = pipe(
      () => this.registerWatcher(),
      this.fetchIssues.bind(this)
    );
  
    pipe(initialRenderPipe, initialStorePipe)();
  }
}