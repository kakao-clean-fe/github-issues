import {AppSelector, selectPageContainerSelector} from './template/selector';
import {$, clearElement} from './util/dom';
import {pageStore$ } from './store/issue.js'
import {LABEL_PAGE, ISSUE_PAGE} from './const';
import {IssuePage} from './page/issue';
import {LabelPage} from './page/label';
import { worker } from './mocks/browser';

worker.start();

/**
 * initiate app
 */
class App {
  #activePage = null; // 일단 한 번에 한 개 페이지 컴포넌트만 동작한다고 가정

  constructor() {
    this.addWatchers();
    this.addRenderPageClickListener();
    
    pageStore$.setValue(LABEL_PAGE);
  }

  renderPage(page) {
    clearElement(AppSelector);
    
    page === ISSUE_PAGE ? this.initPage(new IssuePage()) : this.initPage(new LabelPage());
  }

  initPage(target) {
    this.#activePage?.destroy();

    this.#activePage = target;
  }

  // decide whether to render issue or label page
  clickPageHandler(e) {
    const target = e.target.dataset.target;

    pageStore$.setValue(target ?? LABEL_PAGE);
  }

  addRenderPageClickListener() {
    $(selectPageContainerSelector).addEventListener('click', this.clickPageHandler);
  }

  addWatchers() {
    pageStore$.addWatchers([this.renderPage.bind(this)]);
  }
};

const app = new App();
