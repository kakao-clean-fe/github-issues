import {issueTemplate} from '../../template/issue';
import { convertTemplateToElement } from '../../utils/element';

export default class IssueItem {
  constructor ({$target, issueItem}){
    this.$root = convertTemplateToElement(issueTemplate.issueItem(issueItem));
    $target.appendChild(this.$root);
  }
  
  render() {
    
  }
}
