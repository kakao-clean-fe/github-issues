import { convertTemplateToElement, getElement } from '../../utils/element';
import {issueTemplate} from '../../template/issue';
import { STATUS } from '../../type/issue';
import Component from '../../core/component';

export default class IssueInnerHeader extends Component {
  constructor ({$target, selectedIssueStatus, openedIssueCount, closedIssueCount, onChangeSelectedIssueStatus}){
    super({
      $target,
      template: issueTemplate.innerWrapper({selectedIssueStatus, openedIssueCount, closedIssueCount}),
      events: [{
        selector: '.open-count',
        event: 'click',
        callback: () => onChangeSelectedIssueStatus(STATUS.OPEN),
      },
      {
        selector: '.close-count',
        event: 'click',
        callback: () => onChangeSelectedIssueStatus(STATUS.CLOSE),
      }]
    })
  }
}
