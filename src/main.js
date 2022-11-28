import { AppSelector } from './template/selector';
import { $, clearElement } from './util/dom';
import { LABEL_PAGE, ISSUE_PAGE } from './const';
import { IssuePage } from './page/issue';
import { LabelPage } from './page/label';
import { worker } from './mocks/browser';
import { Router } from './util/router';

worker.start();

/**
 * initiate app + initiate Router
 * route에서 page 확인하면 app에서 그린다
 * router에서 app.renderPage()를 호출한다
 */
class App {
  router = null;
  #curPage = null; // 일단 한 번에 한 개 페이지 컴포넌트만 동작한다고 가정

  constructor() {
    this.initRouter();
  }

  initRouter() {
    this.router = new Router(this);

    const {router} = this;

    router.addRouterEvent();

    location.pathname === '/' ? router.navigate(router.getNewUrl()) : router.findMatchingPage();
  }

  renderPage(pageName='') {
    clearElement($(AppSelector));

    const curPageName = this.#curPage?.constructor?.name;

    switch (pageName) {
      case '':
      case curPageName: {
        return; // 같은 페이지면 그대로
      }
      case ISSUE_PAGE: {
        const issuePage = new IssuePage();

        issuePage.render($(AppSelector));
        this.updateCurPage(issuePage);
        return;
      }
      case LABEL_PAGE: {
        const labelPage = new LabelPage();

        labelPage.render($(AppSelector));
        this.updateCurPage(labelPage);
        return;
      }
    }
  }

  updateCurPage(newPage = null) {
    this.#curPage?.destroy();
    this.#curPage = newPage;
  }
};

const app = new App();
