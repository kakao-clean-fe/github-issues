import { Subject } from './common';

export class NewLabelStore extends Subject {
  constructor() {
    super();

    this.show = false;
    this.registerEventHandlers();
  }
  registerEventHandlers() {
    document.getElementsByTagName('a')[0].addEventListener('click', e => this.toggleShow());
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
    // document.getElementById('new-label-form').classList.toggle('hidden');
    if (this.model.getShow())
      document.getElementById('new-label-form').classList.remove('hidden');
    else
      document.getElementById('new-label-form').classList.add('hidden');
  }
}
