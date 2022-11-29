import { go } from '../fp';
import { setEvent } from '../curry/dom';
import { pageType } from '../constant';
import { $ } from '../util';
import { selector as sel } from '../constant';
import { Component } from './Component';
import { createHeaderTemplate } from './Templates';
import { actions } from '../flux/action';

export class Header extends Component {
  constructor({ store, $root }) {
    super({ store, $root });
  }
  beforeMounted() {
    this.template = createHeaderTemplate();
  }
  afterRender() {
    this.$issueTabButton = $(sel.issueTab);
    this.$labelTabButton = $(sel.labelTab);
    this.setPage = ((page) => this.store.dispatch(actions.setPage(page))).bind(this);
  }
  hydrate() {
    go(this.$issueTabButton, setEvent('click', () => {
      this.setPage(pageType.issue)
    }));
    go(this.$labelTabButton, setEvent('click', () => this.setPage(pageType.label)));
  }
  getTemplate() {
    return this.template;
  }
}
