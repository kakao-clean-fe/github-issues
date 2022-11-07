import { convertTemplateToElement } from '../../utils/element';
import {issueTemplate} from '../../template/issue';
import IssueItem from '../IssueItem';
import Component from '../../core/component';

export default class IssueList extends Component {
  constructor ({$target, issueList}){
    super({
      $target,
      template: issueTemplate.issueList(),
    })
    this.$listWrapper;

    this.issueList = issueList;
  }

  renderListWrapper () {
    this.$listWrapper = document.createElement('ul');
    this.$root.appendChild(this.$listWrapper);
  }

  renderIssueItems () {
    this.issueList.map(item => {
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
