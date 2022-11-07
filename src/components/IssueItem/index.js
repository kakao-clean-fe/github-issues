import Component from '../../core/component';
import {issueTemplate} from '../../template/issue';
import { convertTemplateToElement } from '../../utils/element';

export default class IssueItem extends Component {
  constructor ({$target, issueItem}){
    super({
      $target,
      template: issueTemplate.issueItem(issueItem),
    })
  }
}
