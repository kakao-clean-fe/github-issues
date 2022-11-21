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
      this._onClickUpdateLabelsButton.bind(this)
    );
  }
  render(labels) {
    $("label-list").innerHTML = "";
    labels.forEach(this._renderLabel.bind(this));
    $("labels-count").innerText = labels.length + " Labels";
  }
  _renderLabel(label) {
    return pipe(getLabelItemTpl, htmlToElement, (ele) =>
      $("label-list").appendChild(ele)
    )(label);
  }
  _onClickUpdateLabelsButton() {
    this.updateLabelsButtonClick$.next();
  }
}
