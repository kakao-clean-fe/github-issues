import { getLabelItemTpl } from "../tpl";

export default class ListLabelView {
  constructor({ model }) {
    this.$target = document.querySelector(".label-list");
    this.ListModel = model;
    this.ListModel.subscribe(this.render.bind(this)); 
    this.render();
  }

  render() {
    const labels = this.ListModel.getLabels();
    labels.map((label) => {
      this.$target.innerHTML += getLabelItemTpl(label);
    });
  }
}
