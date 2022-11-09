import {issueTemplate} from './template/issue';
import issueResponse from '../data-sources/issues.json';
import IssueList from './components/issueList';
import IssueHeader from './components/IssueHeader';
import IssueInnerWrapper from './components/IssueInnerWrapper';
import { getElement } from './utils/element';
import { STATUS } from './type/issue';
import Component from './core/component';

class Main extends Component {
  constructor({$target}) {
    super({
      $target,
      state: {
        issueListResponse: JSON.parse(JSON.stringify(issueResponse)),
        selectedIssueStatus: STATUS.OPEN,
        issueList: () => this.state.issueListResponse.filter(issue => issue.status === this.state.selectedIssueStatus),
        openedIssueCount: () => this.state.issueListResponse.filter(issue => issue.status === STATUS.OPEN).length,
        closedIssueCount: () => this.state.issueListResponse.filter(issue => issue.status === STATUS.CLOSE).length,
      },
      template: issueTemplate.wrapper(),
    })
    
  }

  onChangeSelectedIssueStatus (issueStatus) {
    this.setState('selectedIssueStatus', issueStatus)
  }

  render() {
    this.clearRoot();

    new IssueHeader({
      $target: this.$root,
    }).render();

    new IssueInnerWrapper({
      $target: this.$root,
      selectedIssueStatus: this.state.selectedIssueStatus,
      openedIssueCount: this.state.openedIssueCount(),
      closedIssueCount: this.state.closedIssueCount(),
      onChangeSelectedIssueStatus: (issueStatus) => this.onChangeSelectedIssueStatus(issueStatus),
    }).render();

    new IssueList({
      $target: this.$root,
      issueList: this.state.issueList(),
      selectedIssueStatus: this.state.selectedIssueStatus,
    }).render();
  }
}

new Main({$target: getElement('#app')}).render();