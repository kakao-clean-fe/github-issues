import { getRandomColor, storeLocalStorage, $, toggleLabelCreateButton } from '../utils/utils';
import { Subject } from "./common";

export class CreateLabelStore extends Subject {
  constructor() {
    super();

    this.registerEventHandlers();
  }
  loadLocalStorage() {
    var pendingLabel = JSON.parse(localStorage.getItem('pendingLabel'));
    if (pendingLabel) {
      this.setLabelName(pendingLabel.name);
      this.setLabelDescription(pendingLabel.description);
      this.setLabelColor(pendingLabel.color);
    }
  }
  registerEventHandlers() {
    $('#new-label-color').addEventListener('click', () => {
      var color = getRandomColor();

      this.setLabelColor(`#${color}`);
    });
    $('#label-cancel-button').addEventListener('click', e => {
      this.setLabelName('');
      this.setLabelDescription('');
      this.setLabelColor('');
    });

    $('#label-name-input').addEventListener('input', e => this.setLabelName(e.target.value));
    $('#label-description-input').addEventListener('input', e => this.setLabelDescription(e.target.value));
    $('#label-color-value').addEventListener('input', e => this.setLabelColor(e.target.value));
  }
  getLabelName() {
    return $('#label-name-input').value;
  }
  getLabelDescription() {
    return $('#label-description-input').value;
  }
  getLabelColor() {
    return $('#label-color-value').value;
  }
  setLabelName(value) {
    $('#label-name-input').value = value;
    this.notify();
  }
  setLabelDescription(value) {
    $('#label-description-input').value = value;
    this.notify();
  }
  setLabelColor(value) {
    $('#label-color-value').value = value;
    $('#label-preview').style.background = value;
    $('#new-label-color').style.background = value;
    this.notify();
  }
}

export class CreateLabelObserver {
  constructor(model) {
    this.model = model;
    model.subscribe(this.inputCallback.bind(this))

    this.model.loadLocalStorage();
  }
  inputCallback() {
    storeLocalStorage({
      name: this.model.getLabelName(),
      description: this.model.getLabelDescription(),
      color: this.model.getLabelColor()
    });

    if (!!this.model.getLabelName() && !!this.model.getLabelDescription() && !!this.model.getLabelColor()) {
      toggleLabelCreateButton(true);
    }
    else {
      toggleLabelCreateButton(false);
    }
  }
}