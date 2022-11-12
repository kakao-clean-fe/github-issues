import Component from '..';
import {getLabelItemTpl} from '../../tpl';

const SELECTORS = {
  DELETE_BUTTON: '.delete-button'
}
export default class LabelItem extends Component {

  constructor(...args) {
    super(...args);
  }



  render() {
    const node = this.convertHTMLStringToNode(getLabelItemTpl(this.state));
    node.querySelector(SELECTORS.DELETE_BUTTON).dataset.name = this.state.name;
    return node;
  }
}