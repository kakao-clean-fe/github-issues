import { convertTemplateToElement } from '../../utils/element';
import {issueTemplate} from '../../template/issue';

export default class IssueHeader {
  constructor ({$target}){
    this.$root = convertTemplateToElement(issueTemplate.header());
    $target.appendChild(this.$root);
  }
  
  render() {
  }
}