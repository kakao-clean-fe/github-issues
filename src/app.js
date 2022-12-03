import Root from "./core/root";
import Header from "./layout/Header";
import { routerMixin } from "./core/router"
import { worker } from './mocks/browser';
import { getElement } from "./utils/element";
import { ROUTE } from "./constants/route";

class App extends routerMixin(Root) {
  created () {
    worker.start();
  }

  // TODO wes: Component에서도 pushState 사용가능하게 변경 필요
  onClickMoveLabelPageButton () {
    this.pushState(ROUTE.LABEL);
  }

  onClickMoveIssuePageButton () {
    this.pushState(ROUTE.ISSUE);
  }

  get Header () {
    return Header.getInstance(this.$target, {
      onClickMoveLabelPageButton: () => this.onClickMoveLabelPageButton(),
      onClickMoveIssuePageButton: () => this.onClickMoveIssuePageButton(),
    });
  }

  get pages () {
    return [{
      path: '/',
      file: 'issues'
    },
    {
      path: '/label',
      file: 'labels'
    }
  ]}
}

new App(getElement('#app'));