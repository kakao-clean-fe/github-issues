import { $ } from '../utils/utils';
import { Subject } from './common';

export class NewLabelStore extends Subject {
  constructor() {
    super();

    this.show = false;
    this.registerEventHandlers();
  }
  registerEventHandlers() {
    $('#new-label-button').addEventListener('click', e => this.toggleShow());
    $('#label-create-button').addEventListener('click', () => this.toggleShow());
  }
  getShow() {
    return this.show;
  }
  toggleShow() {
    this.show = !!!this.show;
    this.notify();
  }
}

export class NewLabelObserver {
  constructor(model) {
    this.model = model;

    this.model.subscribe(this.toggle.bind(this))
  }
  toggle() {
    this.model.getShow() ? $('#new-label-form').classList.remove('hidden') : $('#new-label-form').classList.add('hidden');
  }
}
