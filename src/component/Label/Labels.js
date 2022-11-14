import Component from "..";
import { EVENTS } from "../../constant";
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
  LABEL_CREATE_BUTTON: "#label-create-button",
  DELETE_BUTTON: ".delete-button",
};

const CLASS_HIDDEN = "hidden";
const CLASS_DISABLED = "opacity-50";

const initialForm = {
  name: "",
  description: "",
  color: "#BE185D",
};

export default class Labels extends Component {
  constructor({ store, ...args }) {
    super({ ...args });
    this.store = store;
    this.setState({
      labels: this.store.selectLabels(this.store.getState()),
      showForm: false,
      labelForm: initialForm,
    }),
      this.store.addChangeListener(this.setState);
    this._bindMethod();
  }

  _bindMethod() {
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

  /** 랜덤 라벨 색상 변경 */
  setNewLabelColor() {
    const newColor = getRandomColor();
    const labelForm = {
      ...this.state.labelForm,
      color: newColor,
    };
    this.setState({ labelForm });
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
    this.store.addLabel({
      ...this.state.labelForm,
      color: this.state.labelForm.color.replace("#", ""),
    });
    this.initForm();
  }

  /** 라벨 제거 */
  removeLabel(e) {
    const { name } = e.target.dataset;
    console.log(name);
    if (!name) {
      throw new Error("삭제하려는 name값을 찾지 못했습니다.");
    }
    this.store.removeLabel(name);
  }

  initForm() {
    this.setState({ labelForm: initialForm });
  }

  setListeners() {
    this.on(SELECTORS.NEW_LABEL_BUTTON, EVENTS.CLICK, this.toggleForm);
    this.on(SELECTORS.NEW_LABEL_COLOR, EVENTS.CLICK, this.setNewLabelColor);
    this.on(SELECTORS.LABEL_NAME_INPUT, EVENTS.CHANGE, this.setLabelName);
    this.on(
      SELECTORS.LABEL_DESCRIPTION_INPUT,
      EVENTS.CHANGE,
      this.setLabelDescription
    );
    this.on(SELECTORS.LABEL_CREATE_BUTTON, EVENTS.CLICK, this.addNewLabel);
    this.on(SELECTORS.DELETE_BUTTON, EVENTS.CLICK, this.removeLabel);
  }

  render() {
    if (!this.state) {
      this.template = null;
    }
    this.template = this.convertHTMLStringToNode(getLabelTpl());
    if (this.state.showForm) {
      this.select(SELECTORS.NEW_LABEL_FORM).classList.remove(CLASS_HIDDEN);
    }

    const { name, description, color } = this.state.labelForm || {};

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

    const list = this.select(SELECTORS.LABEL_LIST);
    this.state?.labels?.forEach(
      (label) =>
        new LabelItem({
          target: list,
          state: label,
        })
    );
  }
}
