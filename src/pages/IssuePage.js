import { getIssueTpl, getIssueItemTpl } from '/src/tpl';
import { curry, go, filter, map } from '/src/util/fp';
import { fetchData } from '/src/util/common';
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
    this.$openCount.addEventListener('click', () => {
      this.renderIssue(filterIssue('open'));
      this.$openCount.classList.add('font-bold');
      this.$closeCount.classList.remove('font-bold');
    });
    this.$closeCount.addEventListener('click', () => {
      this.renderIssue(filterIssue('close'));
      this.$closeCount.classList.add('font-bold');
      this.$openCount.classList.remove('font-bold');
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