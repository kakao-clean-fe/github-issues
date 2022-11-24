import { setInnerHTML } from '../curry/dom';
import { go } from '../fp';

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
    go(this.$root, setInnerHTML(template));
  }
  afterRender() {}
  hydrate() {}
  beforeMounted() {}
  afterMounted() {}
  getTemplate() {}
}
