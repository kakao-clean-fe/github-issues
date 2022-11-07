import { convertTemplateToElement } from '../../utils/element';
import {issueTemplate} from '../../template/issue';
import Component from '../../core/component';

export default class IssueHeader extends Component {
  constructor ({$target}){
    super({
      $target,
      template: issueTemplate.header(),
    })
  }
}