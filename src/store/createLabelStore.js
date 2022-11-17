import { Subject } from "./common";

export class CreateLabelStore extends Subject {
  constructor() {
    super();

    this.configureElements();
    this.registerEventHandlers();
  }
  configureElements() {
    this.$cancelButton = document.getElementById('label-cancel-button');
    this.$createButton = document.getElementById('label-create-button');

    this.$name = document.getElementById('label-name-input');
    this.$description = document.getElementById('label-description-input');
    this.$color = document.getElementById('label-color-value');
  }
  registerEventHandlers() {
    this.$cancelButton.addEventListener('click', e => {
      this.setLabelName('');
      this.setLabelDescription('');
      this.setLabelColor('');
    });
    this.$createButton.addEventListener('click', e => console.log('create'));

    this.$name.addEventListener('input', e => this.setLabelName(e.target.value));
    this.$description.addEventListener('input', e => this.setLabelDescription(e.target.value));
    this.$color.addEventListener('input', e => this.setLabelColor(e.target.value));
  }
  getLabelName() {
    return this.$name.value;
  }
  getLabelDescription() {
    return this.$description.value;
  }
  getLabelColor() {
    return this.$color.value;
  }
  setLabelName(value) {
    this.$name.value = value;
    this.notify();
  }
  setLabelDescription(value) {
    this.$description.value = value;
    this.notify();
  }
  setLabelColor(value) {
    this.$color.value = value;
    this.notify();
  }
}

export class CreateLabelObserver {
  constructor(model) {
    this.model = model;
    model.subscribe(this.activate.bind(this))

    this.$createButton = document.getElementById('label-create-button');
  }
  activate() {
    if (!!this.model.getLabelName() && !!this.model.getLabelDescription() && !!this.model.getLabelColor()) {
      this.$createButton.classList.remove('opacity-50');
      this.$createButton.disabled = false;
    }
  }
}