import { Observable } from "../helpers/observable.js";
import { $ } from "../helpers/render-helpers.js";

export class LabelCreateView {
  refreshColorBtnClick$ = new Observable();
  labelFormSubmit$ = new Observable();
  labelFormChange$ = new Observable();
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
      this._onChangeLabelName(e)
    );
    $("label-description-input").addEventListener("change", (e) =>
      this._onChangeLabelDescription(e)
    );
  }

  renderColor(color) {
    $("new-label-color").style.backgroundColor = "#" + color;
    $("label-color-value").value = color;
  }
  renderLabelPreview({ color, name }) {
    $("label-preview").style.backgroundColor = "#" + color;
    $("label-preview").innerText = name ? name : "Label Preview";
  }
  checkCreateButtonActive({ name, description, color }) {
    $("label-create-button").disabled = !(name && description && color);
    if (name && description && color) {
      $("label-create-button").classList.remove("opacity-50");
    } else {
      $("label-create-button").classList.add("opacity-50");
    }
  }
  updateForm(form) {
    console.log("updateForm", form);
    $("label-name-input").value = form.name;
    $("label-description-input").value = form.description;
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
  _onChangeLabelName(e) {
    this.labelFormChange$.next({ name: e.target.value });
  }
  _onChangeLabelDescription(e) {
    this.labelFormChange$.next({ description: e.target.value });
  }
  _onClickLabelCreateButton(e) {
    e.preventDefault();
    this.labelFormSubmit$.next();
  }
}
