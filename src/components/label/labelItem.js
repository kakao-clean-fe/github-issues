// Components
import { BaseComponent } from '../component';

// Templates
import { getLabelItemTpl } from '../../template/label';

export default class LabelItem extends BaseComponent {
  constructor({ name, color, description }) {
    super(getLabelItemTpl({ name, color, description }));
  }
}
