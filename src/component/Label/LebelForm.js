import Component from "..";
import { EVENTS } from "../../constant";
import { getLabelForm } from "../../template/LabelForm";
import { getRandomColor } from "../../utils";

const SELECTORS = {
  LABEL_LIST: ".label-list",
  NEW_LABEL_BUTTON: ".new-label-button",
  NEW_LABEL_FORM: "#new-label-form",
  NEW_LABEL_COLOR: "#new-label-color",
  LABEL_PREVIEW: "#label-preview",
  LABEL_COLOR_INPUT: "#label-color-value",
  LABEL_NAME_INPUT: "#label-name-input",
  LABEL_DESCRIPTION_INPUT: "#label-description-input",
  LABEL_CREATE_BUTTON: "#label-create-button",
  DELETE_BUTTON: ".delete-button",
};

const CLASS_HIDDEN = "hidden";
const CLASS_DISABLED = "opacity-50";

export default class LabelForm extends Component {
  constructor({ model, ...args }) {
    super({ ...args });
    this._bindMethod();
    this.model = model;
    this.setState({
      labelForm: this.model.labelForm,
    });
    this.model.subscribe(({labelFrom}) => this.setState({labelFrom}))
  }

  _bindMethod() {
    this.addNewLabel = this.addNewLabel.bind(this);
    this.setNewLabelColor = this.setNewLabelColor.bind(this);
    this.setLabelName = this.setLabelName.bind(this);
    this.setLabelDescription = this.setLabelDescription.bind(this);
    this.initForm = this.initForm.bind(this);
    this.render = this.render.bind(this);
  }

  setListeners() {
    this.on(
      SELECTORS.LABEL_DESCRIPTION_INPUT,
      EVENTS.CHANGE,
      this.setLabelDescription
    );
    this.on(SELECTORS.LABEL_CREATE_BUTTON, EVENTS.CLICK, this.addNewLabel);
    this.on(SELECTORS.NEW_LABEL_COLOR, EVENTS.CLICK, this.setNewLabelColor);
    this.on(SELECTORS.LABEL_NAME_INPUT, EVENTS.CHANGE, this.setLabelName);
  }

  /** 랜덤 라벨 색상 변경 */
  setNewLabelColor() {
    const newColor = getRandomColor();
    const labelForm = {
      ...this.state.labelForm,
      color: newColor,
    };
    this.setState({ labelForm });
    this.model.subscribe(({labelForm}) => this.setState({labelForm}));
  }

  /** 라벨 이름 변경 */
  setLabelName(e) {
    const newName = e.target.value;
    const labelForm = {
      ...this.state.labelForm,
      name: newName,
    };
    this.setState({ labelForm });
  }

  /** 라벨 설명 변경 */
  setLabelDescription(e) {
    const newDesc = e.target.value;
    const labelForm = {
      ...this.state.labelForm,
      description: newDesc,
    };
    this.setState({ labelForm });
  }

  /** 라벨 추가 */
  addNewLabel() {
    this.model.addLabel({
      ...this.state.labelForm,
      color: this.state.labelForm.color.replace("#", ""),
    });
    this.initForm();
  }

  initForm() {
    this.model.initForm();
  }

  render() {
    if (!this.state) {
      this.template = null;
    }

    this.template = this.convertHTMLStringToNode(getLabelForm());
    const { name, description, color } = this.state?.labelForm || {};
    if (name && description && color) {
      const button = this.select(SELECTORS.LABEL_CREATE_BUTTON);
      button.disabled = false;
      button.classList.remove(CLASS_DISABLED);
    }

    this.select(SELECTORS.LABEL_PREVIEW).style.backgroundColor = color;
    this.select(SELECTORS.NEW_LABEL_COLOR).style.backgroundColor = color;
    this.select(SELECTORS.LABEL_COLOR_INPUT).value = color;
    this.select(SELECTORS.LABEL_NAME_INPUT).value = name;
    this.select(SELECTORS.LABEL_DESCRIPTION_INPUT).value = description;
  }
}
