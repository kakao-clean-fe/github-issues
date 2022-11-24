import { pipe } from "../helpers/fp-helpers.js";
import { Observable } from "../helpers/observable.js";
import { $, htmlToElement } from "../helpers/render-helpers.js";
import { getLabelItemTpl, getLabelTpl } from "../helpers/tpl.js";

export class LabelListView {
  updateLabelsButtonClick$ = new Observable();
  constructor() {
    $("app").innerHTML = getLabelTpl();
    $("update-labels-button").addEventListener(
      "click",
      this.#onClickUpdateLabelsButton.bind(this)
    );
  }
  render(labels) {
    $("label-list").innerHTML = "";
    labels.forEach(this.#renderLabel.bind(this));
    $("labels-count").innerText = labels.length + " Labels";
  }
  #renderLabel(label) {
    return pipe(getLabelItemTpl, htmlToElement, (ele) =>
      $("label-list").appendChild(ele)
    )(label);
  }
  #onClickUpdateLabelsButton() {
    this.updateLabelsButtonClick$.next();
  }
}
