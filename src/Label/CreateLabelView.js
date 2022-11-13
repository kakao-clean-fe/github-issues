import { CLASS_OPEN_COUNT_VALUE } from "../constants";
import { getLabelItemTpl } from "../tpl";

const NEW_LABEL_FORM_ID = '#new-label-form';

export default class CreateLabelView {
  constructor({ model }) {
    this.$target = document.querySelector(NEW_LABEL_FORM_ID);
    this.ListModel = model;
    this.ListModel.subscribe(this.render.bind(this)); 
    this.render();
  }

  render() {
    if (this.$target.classList.contains('hidden')) {
      this.$target.classList.remove('hidden');
    } 
    this.$target.classList.add('hidden');
  }
}
