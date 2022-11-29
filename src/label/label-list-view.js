import { pipe } from "../helpers/fp-helpers.js";
import { Observable } from "../helpers/observable.js";
import { $$, htmlToElement } from "../helpers/render-helpers.js";
import { getLabelItemTpl, getLabelTpl } from "../helpers/tpl.js";

export class LabelListView {
  updateLabelsButtonClick$ = new Observable();
  $ = () => {};
  constructor(rootComponent) {
    this.$ = $$(rootComponent);

    this.$("app").innerHTML = getLabelTpl();
    this.$("update-labels-button").addEventListener(
      "click",
      this.#onClickUpdateLabelsButton.bind(this)
    );
  }
  render(labels) {
    this.$("label-list").innerHTML = "";
    labels.forEach(this.#renderLabel.bind(this));
    this.$("labels-count").innerText = labels.length + " Labels";
  }
  #renderLabel(label) {
    return pipe(getLabelItemTpl, htmlToElement, (ele) =>
      this.$("label-list").appendChild(ele)
    )(label);
  }
  #onClickUpdateLabelsButton() {
    this.updateLabelsButtonClick$.next();
  }
}
