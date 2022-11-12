import Component from "..";
import {getLabelTpl} from '../../tpl';
import { getRandomColor } from "../../utils";
import LabelItem from "./LabelItem";

const SELECTORS = {
  LABEL_LIST:'.label-list',
  NEW_LABEL_BUTTON: '.new-label-button',
  NEW_LABEL_FORM: '#new-label-form',
  NEW_LABEL_COLOR: '#new-label-color',
  LABEL_PREVIEW: '#label-preview'
}
const CLASS_HIDDEN = 'hidden';



export default class Labels extends Component {

  state = {
    showForm: false,
    labelColor: '#BE185D'
  }

  constructor(...args) {
    super(...args);
    this.toggleForm = this.toggleForm.bind(this);
    this.setNewLabelColor = this.setNewLabelColor.bind(this);
  }

  toggleForm() {
    this.setState({showForm: !this.state.showForm});
  }

  setNewLabelColor() {
    const labelColor = getRandomColor();
    this.setState({labelColor})
  }

  setListeners() {
    this.on(SELECTORS.NEW_LABEL_BUTTON, 'click', this.toggleForm);
    this.on(SELECTORS.NEW_LABEL_COLOR, 'click', this.setNewLabelColor)
  }

  render() {
    const labelNode = this.convertHTMLStringToNode(getLabelTpl());
    if(this.state.showForm) {
      labelNode.querySelector(SELECTORS.NEW_LABEL_FORM).classList.remove(CLASS_HIDDEN);
    }

    labelNode.querySelector(SELECTORS.LABEL_PREVIEW).style.backgroundColor = this.state.labelColor;
    labelNode.querySelector(SELECTORS.NEW_LABEL_COLOR).style.backgroundColor = this.state.labelColor


    const list = labelNode.querySelector(SELECTORS.LABEL_LIST);
    this.state?.labels?.forEach(label => new LabelItem({
      target: list,
      state: label
    })) 
    return labelNode;
  }
}