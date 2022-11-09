import { BaseComponent } from '../../component.js';
import { getIssueItemTpl } from '../../../tpl';

export class IssueComponent extends BaseComponent {
  constructor(item) {
    super(getIssueItemTpl(item));
  }
}
