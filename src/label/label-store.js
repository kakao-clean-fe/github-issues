import { LabelApi } from "../api/fetch.js";

export class LabelStore {
  _DEFAULT_FORM = {
    color: "",
    name: "",
    description: "",
  };
  _labelList = [];
  _form = { ...this._DEFAULT_FORM };
  constructor() {
    this.getLabels();
    this.#saveAndLoadFromLocalStorage();
  }
  #saveAndLoadFromLocalStorage() {
    window.addEventListener("unload", () => {
      localStorage.setItem("label-create", JSON.stringify(this._form));
    });
    window.addEventListener("load", () => {
      const savedForm = localStorage.getItem("label-create");
      if (savedForm) this.form = JSON.parse(savedForm);
    });
  }
  async getLabels() {
    const res = await LabelApi.getLabelsWithDelay();
    if (res) {
      this.labelList = res;
    }
  }
  async createLabel() {
    const res = await LabelApi.postNewLabel(this._form);
    if (res.error) {
      console.error(res.error);
      alert(res.error);
      return;
    }
    this.labelList = res;
    this.form = { ...this._DEFAULT_FORM };
  }
  generateRandomColor() {
    const randomRGBValue = () => Math.floor(Math.random() * 256 * 256 * 256);
    this.form = { ...this._form, color: randomRGBValue().toString(16) };
  }
  setLabelForm(changes) {
    const newForm = this._form;
    if (changes.name) newForm.name = changes.name;
    if (changes.description) newForm.description = changes.description;
    this.form = newForm;
  }
}
