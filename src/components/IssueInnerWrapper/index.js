import { convertTemplateToElement, getElement } from '../../utils/element';
import {issueTemplate} from '../../template/issue';
import { STATUS } from '../../type/issue';

export default class IssueInnerHeader {
  constructor ({$target, selectedIssueStatus, openedIssueCount, closedIssueCount, onChangeSelectedIssueStatus}){
    this.$root = convertTemplateToElement(issueTemplate.innerWrapper({selectedIssueStatus, openedIssueCount, closedIssueCount}));
    $target.appendChild(this.$root);

    this.$openButton = getElement('.open-count');
    this.$openButton.addEventListener('click', () => onChangeSelectedIssueStatus(STATUS.OPEN))
    this.$closeButton = getElement('.close-count');
    this.$closeButton.addEventListener('click', () => onChangeSelectedIssueStatus(STATUS.CLOSE))
  }
  
  render() {
  }
}
