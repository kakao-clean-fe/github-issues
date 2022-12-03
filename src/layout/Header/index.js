import Component from "../../core/component";
import { routerMixin } from "../../core/router";

class Header extends routerMixin(Component) {
  static getInstance (...args) {
    return new Header(...args);
  }

  get events () {
    return [{
      selector: '#go-label-page',
      event: 'click',
      callback: () => this.props.onClickMoveLabelPageButton(),
    },
    {
      selector: '#go-issue-page',
      event: 'click',
      callback: () => this.props.onClickMoveIssuePageButton(),
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