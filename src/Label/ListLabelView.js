import { CLASS_LABEL_LIST, CLASS_OPEN_BTN } from "../constants";
import { getLabelItemTpl } from "../tpl";

export default class ListLabelView {
  constructor({ model }) {
    this.$target = document.querySelector(CLASS_LABEL_LIST);
    this.ListModel = model;
    this.ListModel.subscribe(this.render.bind(this)); 
  }

  render() {
    const labels = this.ListModel.getLabels();
    const count = labels.length;

    if (count === 0 ) return;

    this.$target.innerHTML = '';
    document.querySelector(CLASS_OPEN_BTN).innerHTML = `${count} Labels`;
    labels.map((label) => {
      this.$target.innerHTML += getLabelItemTpl(label);
    });
  }
}
