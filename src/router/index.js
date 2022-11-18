// Utils
import { routes } from '../utils/navigate';
import { findElement } from '../utils/dom';

// Constants
import { mainSelector } from '../constants/selector';

// Error Page
import ErrorPage from '../pages/errorPage';
const rootContainer = findElement(mainSelector.ROOT);
const errorPage = new ErrorPage(rootContainer);

export default class Router {
  constructor($container) {
    this.$container = $container;

    this.init();
    this.route();
  }

  findMatchedRoute = () =>
    routes.find((route) => route.path === location.pathname);

  route = () => {
    this.$container.innerHTML = '';
    this.findMatchedRoute()?.element() || errorPage.initPage();
  };

  init = () => {
    window.addEventListener('historychange', ({ detail }) => {
      const { to, isReplace } = detail;

      if (isReplace || `/${to}` === location.pathname) {
        history.replaceState(null, '', to);
      } else {
        history.pushState(null, '', to);
        this.route();
      }
    });

    // 뒤로 가기 이벤트 발생 시
    window.addEventListener('popstate', () => {
      this.route();
    });
  };
}
