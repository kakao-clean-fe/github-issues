import { CLASS_LABEL_LIST, CLASS_OPEN_BTN, ID_APP } from "../constants";
import { getLabelItemTpl, getLabelTpl } from "../tpl";

export default class ListLabelView {
  constructor({ model }) {
    this.$target = null;
    this.ListModel = model;
    this.ListModel.subscribe(this.render.bind(this));
  }

  render() {
    this.$target = document.querySelector(CLASS_LABEL_LIST);
    const labels = this.ListModel.labels;
    const count = labels.length;

    if (!this.$target && count === 0) return;

    this.$target.innerHTML = "";
    document.querySelector(CLASS_OPEN_BTN).innerHTML = `${count} Labels`;
    labels.map((label) => {
      this.$target.innerHTML += getLabelItemTpl(label);
    });
  }
}
