import * as tpl from '../tpl';
import { Subject } from './common';

export class LabelListStore extends Subject {
  constructor() {
    super();

    this.labelListText = '';

    this.configureElements();
    this.registerEventHandlers();
    this.initialize();
  }
  configureElements() {
    this.$createButton = document.getElementById('label-create-button');

    this.$name = document.getElementById('label-name-input');
    this.$description = document.getElementById('label-description-input');
    this.$color = document.getElementById('label-color-value');
  }
  registerEventHandlers() {
    this.$createButton.addEventListener('click', e => {
      this.appendLabelListText(
        this.$name.value,
        this.$description.value,
        this.$color.value
      );
    });
  }
  initialize() {
    fetch('/data-sources/labels.json')
      .then(res => res.json())
      .then(data => {
        for (let e of data) {
          this.appendLabelListText(e.name, e.description, e.color);
        }
        document.getElementsByTagName('ul')[0].innerHTML = this.labelListText;
      });
  }
  getLabelListText() {
    return this.labelListText;
  }
  appendLabelListText(name, description, color) {
    let label = new Label(name, color, description);
    this.labelListText += tpl.getLabelItemTpl(label);

    this.notify();
  }
}

class Label {
  constructor(name, color, description) {
    this.name = name;
    this.color = color;
    this.description = description;
  }
}

export class LabelListObserver {
  constructor(model) {
    this.model = model;
    this.model.subscribe(this.addLabel.bind(this));

    this.$panel = document.getElementsByTagName('ul')[0];
  }
  addLabel() {
    this.$panel.innerHTML = this.model.getLabelListText();
  }
}