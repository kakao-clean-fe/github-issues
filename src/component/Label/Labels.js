import Component from "..";
import { getLabelTpl } from "../../tpl";
import { getRandomColor } from "../../utils";
import LabelItem from "./LabelItem";

const SELECTORS = {
  LABEL_LIST: ".label-list",
  NEW_LABEL_BUTTON: ".new-label-button",
  NEW_LABEL_FORM: "#new-label-form",
  NEW_LABEL_COLOR: "#new-label-color",
  LABEL_PREVIEW: "#label-preview",
  LABEL_COLOR_INPUT: "#label-color-value",
  LABEL_NAME_INPUT: "#label-name-input",
  LABEL_DESCRIPTION_INPUT: "#label-description-input",
  LABEL_CREATE_BUTTON: '#label-create-button',
  DELETE_BUTTON: '.delete-button',
};
const CLASS_HIDDEN = "hidden";
const CLASS_DISABLED = 'opacity-50';


const initialForm = {
  name: "",
  description: "",
  color: "#BE185D",
};
export default class Labels extends Component {
  constructor({ store, ...args }) {
    super({...args})
    this.store = store;
    this.setState( {
      labels: this.store.selectLabels(this.store.getState()),
      showForm: false,
      labelForm: initialForm,
    }),
    this.store.addChangeListener(this.setState);

    this.toggleForm = this.toggleForm.bind(this);
    this.setNewLabelColor = this.setNewLabelColor.bind(this);
    this.setLabelName = this.setLabelName.bind(this);
    this.setLabelDescription = this.setLabelDescription.bind(this);
    this.addNewLabel = this.addNewLabel.bind(this);
    this.removeLabel = this.removeLabel.bind(this);
    this.render = this.render.bind(this);
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  setNewLabelColor() {
    const newColor = getRandomColor();
    const labelForm = {
      ...this.state.labelForm,
      color: newColor,
    };
    this.setState({ labelForm });
  }

  setLabelName(e) {
    const newName = e.target.value;
    const labelForm = {
      ...this.state.labelForm,
      name: newName,
    };
    this.setState({ labelForm });
  }

  setLabelDescription(e) {
    const newDesc = e.target.value;
    const labelForm = {
      ...this.state.labelForm,
      description: newDesc,
    };
    this.setState({ labelForm });
  }

  addNewLabel() {
    this.store.addLabel({
      ...this.state.labelForm,
      color: this.state.labelForm.color.replace('#', '')
    });
    this.initForm();
  }

  removeLabel(e) {
    const {name} = e.target.dataset;
    console.log(name);
    if(!name) {
      throw new Error('삭제하려는 name값을 찾지 못했습니다.');
    }
    this.store.removeLabel(name);
  }

  initForm() {
    this.setState({labelForm: initialForm});
  }

  setListeners() {
    this.on(SELECTORS.NEW_LABEL_BUTTON, "click", this.toggleForm);
    this.on(SELECTORS.NEW_LABEL_COLOR, "click", this.setNewLabelColor);
    this.on(SELECTORS.LABEL_NAME_INPUT, 'change', this.setLabelName)
    this.on(SELECTORS.LABEL_DESCRIPTION_INPUT, 'change', this.setLabelDescription)
    this.on(SELECTORS.LABEL_CREATE_BUTTON, 'click', this.addNewLabel);
    this.on(SELECTORS.DELETE_BUTTON, 'click', this.removeLabel);
  } 

  render() {
    if(!this.state) {
      return null;
    }
    const labelNode = this.convertHTMLStringToNode(getLabelTpl());
    if (this.state.showForm) {
      labelNode
        .querySelector(SELECTORS.NEW_LABEL_FORM)
        .classList.remove(CLASS_HIDDEN);
    }

    const { name, description, color } = this.state.labelForm || {};

    if(name && description && color) {
      const button = labelNode.querySelector(SELECTORS.LABEL_CREATE_BUTTON)
      button.disabled = false;
      button.classList.remove(CLASS_DISABLED);
    }

    labelNode.querySelector(SELECTORS.LABEL_PREVIEW).style.backgroundColor =
      color;
    labelNode.querySelector(SELECTORS.NEW_LABEL_COLOR).style.backgroundColor =
      color;
    labelNode.querySelector(SELECTORS.LABEL_COLOR_INPUT).value = color;
    labelNode.querySelector(SELECTORS.LABEL_NAME_INPUT).value = name;
    labelNode.querySelector(SELECTORS.LABEL_DESCRIPTION_INPUT).value =
      description;



    const list = labelNode.querySelector(SELECTORS.LABEL_LIST);
    this.state?.labels?.forEach(
      (label) =>
        new LabelItem({
          target: list,
          state: label,
        })
    );
    return labelNode;
  }
}
