// Components
import { BaseComponent } from '../component';

// Templates
import { getIssueItemTpl } from '../../tpl';

export class IssueItem extends BaseComponent {
  constructor(item) {
    super(getIssueItemTpl(item));
  }
}
