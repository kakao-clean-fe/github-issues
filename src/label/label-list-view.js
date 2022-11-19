import { pipe } from "../helpers/fp-helpers.js";
import { $, htmlToElement } from "../helpers/render-helpers.js";
import { getLabelItemTpl, getLabelTpl } from "../helpers/tpl.js";

export class LabelListView {
  constructor() {
    $("app").innerHTML = getLabelTpl();
  }
  render(labels) {
    $("label-list").innerHTML = "";
    labels.forEach(this._renderLabel.bind(this));
  }
  _renderLabel(label) {
    return pipe(getLabelItemTpl, htmlToElement, (ele) =>
      $("label-list").appendChild(ele)
    )(label);
  }
}
