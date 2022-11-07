import {issueTemplate} from './template/issue';
import issueResponse from '../data-sources/issues.json';
import IssueList from './components/issueList';
import IssueHeader from './components/IssueHeader';
import IssueInnerWrapper from './components/IssueInnerWrapper';
import { getElement } from './utils/element';
import { STATUS } from './type/issue';

class Main {
  constructor({$target}) {
    $target.innerHTML = issueTemplate.wrapper().trim();
    this.$root = $target.firstChild;

    this.issueListResponse = JSON.parse(JSON.stringify(issueResponse));
    this.selectedIssueStatus = STATUS.OPEN;
    this.issueList = this.issueListResponse.filter(issue => issue.status ===  this.selectedIssueStatus);

    this.openedIssueCount = this.issueListResponse.filter(issue => issue.status === STATUS.OPEN).length;
    this.closedIssueCount = this.issueListResponse.filter(issue => issue.status === STATUS.CLOSE).length;
  }

  onChangeSelectedIssueStatus (issueStatus) {
    this.selectedIssueStatus = issueStatus;
    this.issueList = this.issueListResponse.filter(issue => issue.status ===  this.selectedIssueStatus);
    
    this.$root.innerHTML = '';
    this.render();
  }

  render() {  
    new IssueHeader({
      $target: this.$root,
    }).render();

    new IssueInnerWrapper({
      $target: this.$root,
      selectedIssueStatus: this.selectedIssueStatus,
      openedIssueCount: this.openedIssueCount,
      closedIssueCount: this.closedIssueCount,
      onChangeSelectedIssueStatus: (issueStatus) => this.onChangeSelectedIssueStatus(issueStatus),
    }).render();

    new IssueList({
      $target: this.$root,
      issueList: this.issueList,
      selectedIssueStatus: this.selectedIssueStatus,
    }).render();
  }
}

new Main({$target: getElement('#app')}).render();