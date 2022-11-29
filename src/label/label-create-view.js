import { Observable } from "../helpers/observable.js";
import { $$ } from "../helpers/render-helpers.js";

export class LabelCreateView {
  refreshColorBtnClick$ = new Observable();
  labelFormSubmit$ = new Observable();
  labelFormChange$ = new Observable();
  $ = () => {};
  constructor(rootComponent) {
    this.$ = $$(rootComponent);
    this.#showLabelForm();
    this.#addDOMEventListeners();
  }

  #showLabelForm() {
    const newLabelFormElement = this.$("new-label-form");
    if (newLabelFormElement.classList.contains("hidden")) {
      newLabelFormElement.classList.remove("hidden");
    }
  }

  #addDOMEventListeners() {
    this.$("new-label-button").addEventListener(
      "click",
      this.onClickToggleCreateButton.bind(this)
    );
    this.$("new-label-color").addEventListener(
      "click",
      this.#onClickRefreshColorButton.bind(this)
    );
    this.$("label-create-button").addEventListener(
      "click",
      this.#onClickLabelCreateButton.bind(this)
    );
    this.$("label-name-input").addEventListener("change", (e) =>
      this.#onChangeLabelName(e)
    );
    this.$("label-description-input").addEventListener("change", (e) =>
      this.#onChangeLabelDescription(e)
    );
  }

  renderColor(color) {
    this.$("new-label-color").style.backgroundColor = "#" + color;
    this.$("label-color-value").value = color;
  }
  renderLabelPreview({ color, name }) {
    this.$("label-preview").style.backgroundColor = "#" + color;
    this.$("label-preview").innerText = name ? name : "Label Preview";
  }
  checkCreateButtonActive({ name, description, color }) {
    this.$("label-create-button").disabled = !(name && description && color);
    if (name && description && color) {
      this.$("label-create-button").classList.remove("opacity-50");
    } else {
      this.$("label-create-button").classList.add("opacity-50");
    }
  }
  updateForm(form) {
    this.$("label-name-input").value = form.name;
    this.$("label-description-input").value = form.description;
  }
  #toggleCreateView() {
    const newLabelFormElement = this.$("new-label-form");
    newLabelFormElement.classList.toggle("hidden");
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
