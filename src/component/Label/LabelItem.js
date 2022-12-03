import Component from "..";
import { getLabelItemTpl } from "../../tpl";

const SELECTORS = {
  DELETE_BUTTON: ".delete-button",
};
export default class LabelItem extends Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    this.template = this.convertHTMLStringToNode(getLabelItemTpl(this.state));
    this.select(SELECTORS.DELETE_BUTTON).dataset.name = this.state.name;
  }
}
