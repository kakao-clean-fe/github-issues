import * as tpl from '../tpl';
import { $, toggleLabelCreateButton, setInput } from '../utils/utils';
import { Subject } from './common';

export class LabelListStore extends Subject {
  constructor() {
    super();

    this.labelListText = '';

    this.registerEventHandlers();
    this.initialize();
  }
  registerEventHandlers() {
    $('#label-create-button').addEventListener('click', e => {
      this.appendNewLabel(
        $('#label-name-input').value,
        $('#label-description-input').value,
        $('#label-color-value').value.split('#')[1]
      );
      localStorage.clear();

      setInput('label-name-input', '');
      setInput('label-description-input', '');
      setInput('label-color-value', '');

      toggleLabelCreateButton(false);
    });
  }
  fetchRaw(isStatic) {
    return isStatic ? fetch('/data-sources/labels.json') : fetch('http://localhost:5173/labels');
  }
  initialize() {
    this.labelListText = '';
    this.fetchRaw(false)
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
  appendNewLabel(name, description, color) {
    fetch('/labels', {
      method: 'POST',
      body: JSON.stringify(
        new Label(name, color, description)
      )
    })
      .then(res => {
        if (!res.ok)
          throw new Error();
      })
      .catch(e => alert('짐시 후 다시 시도해주세요.'))
      .then(() => { this.initialize() });
  }
}

function Label(name, color, description) {
  this.name = name;
  this.color = color;
  this.description = description;
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