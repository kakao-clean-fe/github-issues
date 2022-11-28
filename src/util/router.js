import { DEFAULT_PAGE, ISSUE_PAGE, LABEL_PAGE } from "../const";
import { selectPageContainerSelector } from "../template/selector";
import { $ } from "./dom"

const routes = [
  {path: /\/issue/, page: ISSUE_PAGE},
  {path: /\/label/, page: LABEL_PAGE},
];

export class Router {
  constructor(app) {
    this.app = app;
  }

  getNewUrl(targetPath = DEFAULT_PAGE) {
    return location.origin + '/' + targetPath
  }

  clickNavButton({target}) {
    const targetButton = target.closest('button');
    if (!(targetButton instanceof HTMLButtonElement)) return;

    const targetPath = targetButton.dataset.target;
    if (!targetPath) return;

    this.navigate(this.getNewUrl(targetPath));
  }

  clickAnchorTag(e) {
    const anchorTag = e.target.closest('a');
    if (!(anchorTag instanceof HTMLAnchorElement)) return;

    e.preventDefault(); // #로 이동막기
  }

  navigate(to, isReplace = false){
    const historyChangeEvent = new CustomEvent('historychange', {
      detail: {
        to,
        isReplace
      }
    });

    dispatchEvent(historyChangeEvent);
  }

  historyChangeEventCallback({detail: {to, isReplace}}){
    if (to === location.origin + location.pathname) {
      return;
    }

    // window.location을 직접 설정하는 것과 비슷하지만 몇 가지 이점이 있음
    // historychange이벤트를 일으키지 않음
    isReplace ? history.replaceState({}, '', to) : history.pushState({}, '', to);

    this.findMatchingPage();
  }

  findMatchingPage() {
    const path = location.pathname;
    const target = routes.find(route => route.path.test(path));
    
    this.app.renderPage(target?.page)
  }

  addRouterEvent() {
    // anchor tag 클릭시 urldp # 붙는것 막기
    document.body.addEventListener('click', this.clickAnchorTag.bind(this));

    $(selectPageContainerSelector).addEventListener('click', this.clickNavButton.bind(this));
    // 원래의 hashchange event: it is fired when the fragment identifier of the URL has changed 
    window.addEventListener('historychange', this.historyChangeEventCallback.bind(this));
    /** 뒤로가기, 앞으로가기 */
    window.addEventListener('popstate', this.findMatchingPage.bind(this));
  }
}