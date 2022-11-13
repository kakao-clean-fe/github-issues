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
    console.log('labelsview', labels, this.$target);
    const count = labels.length;

    if (count === 0 ) return;
    this.$target.innerHTML = '';
    document.querySelector(".open-count").innerHTML = `${count} Labels`;
    labels.map((label) => {
      this.$target.innerHTML += getLabelItemTpl(label);
    });
  }
}
