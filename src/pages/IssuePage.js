import { getIssueTpl, getIssueItemTpl } from '/src/tpl';
import { curry, go, filter, map } from '/src/util/fp';
import { on, fetchData } from '/src/util/common';

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
    on(this.$openCount, 'click', () => {
      this.renderIssue(filterIssue(CONST.OPEN));
      this.$openCount.classList.add(CONST.FOND_BOLD);
      this.$closeCount.classList.remove(CONST.FOND_BOLD);
    });
    on(this.$closeCount, 'click', () => {
      this.renderIssue(filterIssue(CONST.CLOSE));
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
    this.$openCount = document.querySelector('.statusTab .open-count');
    this.$closeCount = document.querySelector('.statusTab .close-count');
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