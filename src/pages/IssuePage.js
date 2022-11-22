import { getIssueTpl, getIssueItemTpl } from '/src/tpl';
import { curry, go, filter, map } from '/src/util/fp';
import { on, fetchData } from '/src/util/common';
import { $ } from '/src/util/constant';

const CONST = {
  FONT_BOLD: 'font-bold',
  OPEN: 'open',
  CLOSE: 'close'
};
export default class IssuePage {
  constructor(app) {
    this.$app = app;
    this.$issueList = null;
    this.$openCount = null;
    this.$closeCount = null;
    this.issueData = null;
  }
  init() {
    this.initVariables();
    this.initIssueList();
    this.initClickEvent();
  }

  initClickEvent() {
    // ClickEvent
    on($.OPEN_COUNT, 'click', () => {
      this.renderIssue(this.filterIssue(CONST.OPEN));
      this.$openCount.classList.add(CONST.FOND_BOLD);
      this.$closeCount.classList.remove(CONST.FOND_BOLD);
    });
    on($.CLOSE_COUNT, 'click', () => {
      this.renderIssue(this.filterIssue(CONST.CLOSE));
      this.$closeCount.classList.add(CONST.FOND_BOLD);
      this.$openCount.classList.remove(CONST.FOND_BOLD);
    });
  }

  async initIssueList() {
    // Data Fetch
    this.issueData = await fetchData('issues');

    const openIssueCount = this.filterIssue('open').length;
    const closeIssueCount = this.filterIssue('close').length;

    // Set HTML
    this.$openCount.innerHTML = `${openIssueCount} Opens`;
    this.$closeCount.innerHTML = `${closeIssueCount} Closed`;

    this.renderIssue(this.issueData);
  }

  initVariables() {
    this.$app.innerHTML = getIssueTpl();
    this.$issueList = document.querySelector('.issue-list ul');
    this.$openCount = document.querySelector($.OPEN_COUNT);
    this.$closeCount = document.querySelector($.CLOSE_COUNT);
  }

  renderIssue(issues) {
    const setHTML = curry((dom, html) => {
      dom.innerHTML = html;
      return dom;
    });

    go(
      issues,
      map(
        issue => getIssueItemTpl(issue)
      ),
      issue => issue.join(''),
      setHTML(this.$issueList)
    )
  }

  filterIssue(status) {
    return go(
      this.issueData,
      filter(issue => issue.status === status)
    );
  }
}