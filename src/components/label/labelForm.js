// Components
import { BaseComponent } from '../component';

// Templates
import { getLabelFormTpl } from '../../template/label';

export default class LabelForm extends BaseComponent {
  constructor() {
    super(getLabelFormTpl());
  }
}
