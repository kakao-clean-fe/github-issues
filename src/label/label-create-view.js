import { Observable } from "../helpers/observable.js";
import { $ } from "../helpers/render-helpers.js";

export class LabelCreateView {
  refreshColorBtnClick$ = new Observable();
  labelFormSubmit$ = new Observable();
  labelFormChange$ = new Observable();
  constructor() {
    this.#showLabelForm();
    this.#addDOMEventListeners();
  }

  #showLabelForm() {
    const newLabelFormElement = $("new-label-form");
    if (newLabelFormElement.classList.contains("hidden")) {
      newLabelFormElement.classList.remove("hidden");
    }
  }

  #addDOMEventListeners() {
    $("new-label-button").addEventListener(
      "click",
      this.onClickToggleCreateButton.bind(this)
    );
    $("new-label-color").addEventListener(
      "click",
      this.#onClickRefreshColorButton.bind(this)
    );
    $("label-create-button").addEventListener(
      "click",
      this.#onClickLabelCreateButton.bind(this)
    );
    $("label-name-input").addEventListener("change", (e) =>
      this.#onChangeLabelName(e)
    );
    $("label-description-input").addEventListener("change", (e) =>
      this.#onChangeLabelDescription(e)
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
    $("label-name-input").value = form.name;
    $("label-description-input").value = form.description;
  }
  #toggleCreateView() {
    const newLabelFormElement = $("new-label-form");
    if (newLabelFormElement.classList.contains("hidden")) {
      newLabelFormElement.classList.remove("hidden");
    } else {
      newLabelFormElement.classList.add("hidden");
    }
  }
  onClickToggleCreateButton() {
    this.#toggleCreateView();
  }
  #onClickRefreshColorButton() {
    this.refreshColorBtnClick$.next();
  }
  #onChangeLabelName({ target: { value: name } }) {
    this.labelFormChange$.next({ name });
  }
  #onChangeLabelDescription({ target: { value: description } }) {
    this.labelFormChange$.next({ description });
  }
  #onClickLabelCreateButton(e) {
    e.preventDefault();
    this.labelFormSubmit$.next();
  }
}
