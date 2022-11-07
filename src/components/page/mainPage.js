import { BaseComponent } from '../component.js';
import { getIssueTpl } from '../../tpl';

export class MainPage extends BaseComponent {
  constructor(openCount, closedCount) {
    super(getIssueTpl(openCount, closedCount));
  }
}
