import { go, pipe } from '../fp';
import {
  setInnerHTML,
  setInnerText,
  setEvent,
  addClass,
  removeClass,
} from '../curry/dom';
import { $, isClosedIssue, isOpenedIssue } from '../util';
import { getIssueItemTpl, getIssueTpl } from '../components/Templates';
import { selector as sel, pageType } from '../constant';
import { Component } from './Component';

export class IssuePage extends Component {
  constructor({ store, $root }) {
    super({ store, $root });
  }
  beforeMounted() {
    this.issues = this.store.getState(state => state.issues);
    this.openedIssues = this.issues.filter(isOpenedIssue);
    this.closedIssues = this.issues.filter(isClosedIssue);
    this.makeTextBold = pipe(addClass('font-bold'));
    this.makeTextThin = pipe(removeClass('font-bold'));
  }
  render(template = this.getTemplate()) {
    go(this.$root, setInnerHTML(template));
  }
  afterRender() {
    this.$openedButton = $(sel.openedButton);
    this.$closedButton = $(sel.closedButton);
    this.$issueList = $(sel.issueList);
    this.renderOpenedIssues = () => go($(sel.issueList),
      setInnerHTML(this.openedIssues.map(getIssueItemTpl).join(''))
    );
    this.renderClosedIssues = () => go($(sel.issueList),
      setInnerHTML(this.closedIssues.map(getIssueItemTpl).join(''))
    );
  }
  hydrate() {
    this.renderOpenedIssues();
    go(this.$closedButton,
      setInnerText(`${this.closedIssues.length} Closed`),
      setEvent('click', () => {
        this.makeTextBold($(sel.closedButton));
        this.makeTextThin($(sel.openedButton));
        this.renderClosedIssues();
      })
    );
    go(this.$openedButton,
      setInnerText(`${this.openedIssues.length} Opened`),
      setEvent('click', () => {
        this.makeTextBold($(sel.openedButton));
        this.makeTextThin($(sel.closedButton));
        this.renderOpenedIssues();
      })
    );
    this.store.addActionListener(
      this.__handlePageChange.bind(this),
      actionNames => [actionNames.setPage]
    );
  }
  getTemplate() {
    return getIssueTpl();
  }
  __handlePageChange(state) {
    if (state.page === pageType.issue) {
      this.reRender();
    }
  }
}