import { convertTemplateToElement } from '../../utils/element';
import {issueTemplate} from '../../template/issue';
import IssueItem from '../IssueItem';

export default class IssueList {
  constructor ({$target, issueList}){
    this.$root = convertTemplateToElement(issueTemplate.issueList());
    $target.appendChild(this.$root);

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
