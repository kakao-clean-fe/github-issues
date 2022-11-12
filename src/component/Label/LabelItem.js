import Component from '..';
import {getLabelItemTpl} from '../../tpl';

export default class LabelItem extends Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return this.convertHTMLStringToNode(getLabelItemTpl(this.state));
  }
}