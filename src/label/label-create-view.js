import { Observable } from "../helpers/observable.js";
import { $ } from "../helpers/render-helpers.js";
import { LabelCreateView } from "./label-create-view.js";

export class LabelCreateView {
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
