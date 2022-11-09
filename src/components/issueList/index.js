import { convertTemplateToElement } from '../../utils/element';
import {issueTemplate} from '../../template/issue';
import IssueItem from '../IssueItem';
import Component from '../../core/component';

export default class IssueList extends Component {
  constructor ({$target, issueList}){
    super({
      $target,
      state: {
        issueList,
      },
      template: issueTemplate.issueList(),
    })
    this.$listWrapper;
  }

  renderListWrapper () {
    this.$listWrapper = document.createElement('ul');
    this.$root.appendChild(this.$listWrapper);
  }

  renderIssueItems () {
    this.state.issueList.map(item => {
      return (
        new IssueItem({
          $target: this.$listWrapper,
          issueItem: item,
        })
      )
    })
  }

  render() {
    this.renderListWrapper();
    this.renderIssueItems();
  }
}
