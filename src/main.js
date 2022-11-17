import {AppSelector, selectPageContainerSelector} from './template/selector';
import {$, clearElement} from './util/dom';
import {pageStore$ } from './store/issue.js'
import {LABEL_PAGE, ISSUE_PAGE} from './const';
import {issuePage} from './page/issue';
import {labelPage} from './page/label';

/**
 * initiate app
 */
const app = {
  renderPage(page) {
    clearElement(AppSelector);
    
    page === ISSUE_PAGE ? issuePage.render() : labelPage.render();
  },
  // decide whether to render issue or label page
  clickPageHandler(e) {
    const target = e.target.dataset.target;

    pageStore$.setValue(target ?? LABEL_PAGE);
  },
  addRenderPageClickListener() {
    $(selectPageContainerSelector).addEventListener('click', this.clickPageHandler);
  },
  addWatchers() {
    pageStore$.addWatchers([this.renderPage]);
  },
  init() {
    this.addWatchers();
    this.addRenderPageClickListener();
    pageStore$.setValue(LABEL_PAGE);
  }
};

app.init();
