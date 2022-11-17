import {issueTemplate} from './template/issue';
import issueResponse from '../data-sources/issues.json';
import IssueList from './components/issueList';
import IssueHeader from './components/IssueHeader';
import IssueInnerWrapper from './components/IssueInnerWrapper';
import { getElement } from './utils/element';
import { STATUS } from './type/issue';
import Component from './core/component';

class Main extends Component {
  static getInstance(...args) {
    return new Main(...args)
  }

  created () {    
    this.state = {
      issueListResponse: JSON.parse(JSON.stringify(issueResponse)),
      selectedIssueStatus: STATUS.OPEN,
      issueList: () => this.state.issueListResponse.filter(issue => issue.status === this.state.selectedIssueStatus),
      openedIssueCount: () => this.state.issueListResponse.filter(issue => issue.status === STATUS.OPEN).length,
      closedIssueCount: () => this.state.issueListResponse.filter(issue => issue.status === STATUS.CLOSE).length,
    }
  }

  onChangeSelectedIssueStatus (issueStatus) {
    this.setState({...this.state, selectedIssueStatus: issueStatus});
  }

  mounted() {
    const $target = getElement('#issue-wrapper');
  
    IssueHeader.getInstance($target).render();

    IssueInnerWrapper.getInstance($target, {
      selectedIssueStatus: this.state.selectedIssueStatus,
      openedIssueCount: this.state.openedIssueCount(),
      closedIssueCount: this.state.closedIssueCount(),
      onChangeSelectedIssueStatus: (issueStatus) => this.onChangeSelectedIssueStatus(issueStatus),
    }).render();

    IssueList.getInstance(
      $target, {
        issueList: this.state.issueList(),
      }
    ).render();
  }

  get template () {
    return `<div id="issue-wrapper" class="w-9/12 m-auto min-w-min">`
  }
}

Main.getInstance(getElement('#app')).render();