import Component from "../../core/component";
import { routerMixin } from "../../core/router";

const ROUTE = {
  ISSUE: '/',
  LABEL: '/label',
}

class Header extends routerMixin(Component) {
  static getInstance ($target) {
    return new Header($target);
  }

  onClickMoveLabelPageButton () {
    this.pushState(ROUTE.LABEL);
  }

  onClickMoveIssuePageButton () {
    this.pushState(ROUTE.ISSUE);
  }

  get events () {
    return [{
      selector: '#go-label-page',
      event: 'click',
      callback: () => this.onClickMoveLabelPageButton(),
    },
    {
      selector: '#go-issue-page',
      event: 'click',
      callback: () => this.onClickMoveIssuePageButton(),
    }]
  }

  get template() {
    return `
    <nav id="nav" class="flex justify-end py-8 w-full m-auto text-1xl bg-neutral-800" style="padding-right: 12.5rem;">
      <button id="go-issue-page" class="mr-4 base-outer p-2 px-5">Issue</button>
      <button id="go-label-page" class="base-outer p-2 px-5">Label</button>
    </nav>
  `
  }
}

export default Header;