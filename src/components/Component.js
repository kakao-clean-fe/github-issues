import { appendChild } from '../curry/dom';
import { go } from '../fp';
import { convertTemplateToElement } from '../util';

export class Component {
  constructor({ store, $root }) {
    this.store = store;
    this.$root = $root;
    this.beforeMounted();
    this.__mount($root);
    this.afterMounted();
  }
  __mount() {
    this.render();
    this.afterRender();
    this.hydrate();
  }
  render(template = this.getTemplate()) {
    const node = convertTemplateToElement(template);
    go(this.$root, appendChild(node));
  }
  reRender() {
    this.__mount();
    this.afterMounted();
  }
  afterRender() {}
  hydrate() {}
  beforeMounted() {}
  afterMounted() {}
  getTemplate() {}
}
