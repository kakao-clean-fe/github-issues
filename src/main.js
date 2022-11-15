// Components
import { IssuePage } from './pages/issuePage';
import { LabelPage } from './pages/labelPage';

// Constants
import {
  ROOT,
  ISSUE_PAGE_BUTTON,
  LABEL_PAGE_BUTTON,
} from './constants/selector';

// Store
import GlobalStore, { SET_CURRENT_PAGEG } from './store/global';

// Utils
import { findElement } from './utils/dom';
class App {
  constructor(issuePage, labelPage) {
    this.issuePage = issuePage;
    this.labelPage = labelPage;

    // 첫 디폴트 페이지는 이슈 페이지
    this.issuePage.initPage();

    // subscribe 등록
    GlobalStore.subscribe(SET_CURRENT_PAGEG, this.renderPage);

    // 이벤트 등록
    Object.keys(this.#pageButtons).forEach((pageType) => {
      const pageButton = findElement(this.#pageButtons[pageType]);

      pageButton.addEventListener('click', () => {
        // 같은 탭을 클릭했다면
        if (GlobalStore.getState().currentPage === pageType) {
          return;
        }

        GlobalStore.dispatch({
          type: SET_CURRENT_PAGEG,
          payload: pageType,
        });
      });
    });
  }

  #pageButtons = {
    issue: ISSUE_PAGE_BUTTON,
    label: LABEL_PAGE_BUTTON,
  };

  clearPage = () => {
    while (findElement(ROOT).firstChild) {
      findElement(ROOT).removeChild(findElement(ROOT).firstChild);
    }
  };

  renderPage = () => {
    this.clearPage();

    switch (GlobalStore.getState().currentPage) {
      case 'issue':
        this.issuePage.initPage();
        break;
      case 'label':
        this.labelPage.initPage();
        break;
    }
  };
}

window.onload = () => {
  const issuePage = new IssuePage();
  const labelPage = new LabelPage();

  new App(issuePage, labelPage);
};
