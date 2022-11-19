import { Observable } from "../helpers/observable.js";
import { fetchLabels } from "../api/fetch.js";
import { pipe } from "../helpers/fp-helpers.js";
import { $, htmlToElement } from "../helpers/render-helpers.js";
import { getLabelItemTpl, getLabelTpl } from "../helpers/tpl.js";

class LabelStore {
  _labelList = [];
  _color = "";
  constructor() {
    this._getLabels();
  }
  _getLabels() {
    fetchLabels().then((res) => {
      this.labelList = res;
    });
  }
  createLabel(formValue) {
    this.labelList = this._labelList.concat(formValue);
  }
  generateRandomColor() {
    const randomRGBValue = () => Math.floor(Math.random() * 256 * 256 * 256);
    this.color = randomRGBValue().toString(16);
  }
}

class LabelCreateView {
  refreshColorBtnClick$ = new Observable();
  labelFormSubmit$ = new Observable();
  constructor() {
    $("new-label-button").addEventListener(
      "click",
      this._onClickToggleCreateButton.bind(this)
    );
    $("new-label-color").addEventListener(
      "click",
      this._onClickRefreshColorButton.bind(this)
    );
    $("label-create-button").addEventListener(
      "click",
      this._onClickLabelCreateButton.bind(this)
    );
    $("label-name-input").addEventListener("change", (e) =>
      this._onChangeLabelForm(e)
    );
    $("label-description-input").addEventListener("change", (e) =>
      this._onChangeLabelForm(e)
    );
    $("new-label-color").addEventListener("click", (e) =>
      this._onChangeLabelForm(e)
    );
  }

  // TODO: 없애기
  get labelFormValue() {
    return {
      name: $("label-name-input").value,
      description: $("label-description-input").value,
      color: $("label-color-value").value,
    };
  }

  renderColor(color) {
    $("new-label-color").style.backgroundColor = "#" + color;
    $("label-color-value").value = color;
  }
  _renderLabelPreview({ color, name }) {
    $("label-preview").style.backgroundColor = "#" + color;
    $("label-preview").innerText = name ? name : "Label Preview";
  }
  _checkCreateButtonActive({ name, description, color }) {
    $("label-create-button").disabled = !(name && description && color);
    if (name && description && color) {
      $("label-create-button").classList.remove("opacity-50");
    } else {
      $("label-create-button").classList.add("opacity-50");
    }
  }
  _toggleCreateView() {
    if ($("new-label-form").classList.contains("hidden")) {
      $("new-label-form").classList.remove("hidden");
    } else {
      $("new-label-form").classList.add("hidden");
    }
  }
  _onClickToggleCreateButton() {
    this._toggleCreateView();
  }
  _onClickRefreshColorButton() {
    this.refreshColorBtnClick$.next();
  }
  _onChangeLabelForm(e) {
    const formValue = this.labelFormValue;
    this._checkCreateButtonActive(this.labelFormValue);
    this._renderLabelPreview(formValue);
  }
  _onClickLabelCreateButton(e) {
    e.preventDefault();
    this.labelFormSubmit$.next(this.labelFormValue);
  }
}

class LabelListView {
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

export function initLabelPage() {
  const labelStore = new LabelStore();
  const labelListView = new LabelListView();
  const labelCreateView = new LabelCreateView();

  labelCreateView.refreshColorBtnClick$.subscribe(() => {
    labelStore.generateRandomColor();
  });
  labelCreateView.labelFormSubmit$.subscribe((value) => {
    labelStore.createLabel(value);
  });

  Object.defineProperty(labelStore, "labelList", {
    set(labels) {
      labelListView.render(labels);
      this._labelList = labels;
    },
  });
  Object.defineProperty(labelStore, "color", {
    set(color) {
      labelCreateView.renderColor(color);
      this._color = color;
    },
  });
}
