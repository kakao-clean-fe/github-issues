// Components
import { BaseComponent } from '../component';

// Templates
import { getLabelItemTpl } from '../../tpl';

export class LabelItem extends BaseComponent {
  constructor({ name, color, description }) {
    super(getLabelItemTpl({ name, color, description }));
  }
}
