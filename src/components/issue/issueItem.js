// Components
import { BaseComponent } from '../component';

// Templates
import { getIssueItemTpl } from '../../template/issue';

export class IssueItem extends BaseComponent {
  constructor(item) {
    super(getIssueItemTpl(item));
  }
}
