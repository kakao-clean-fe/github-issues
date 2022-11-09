import { convertTemplateToElement, getElement } from '../utils/element';
export default class Component {
  constructor ({$target, template, state, events}){
    this.$root;
    this.$target = $target;
    this.template = template;
    this.events = events
    this.state = state

    this.renderRoot();
    this.addEvents();
  }

  addEvents() {
    if(this.events) {
      this.events.map(event => this.addEvent(event));
    }
  }

  addEvent ({selector, event, callback}) {
    getElement(selector).addEventListener(event, callback);
  }

  setState(key, value) {
    this.state[key] = value;
    this.render();
  }

  renderRoot () {
    this.$root = convertTemplateToElement(this.template);
    this.$target.appendChild(this.$root);
  }

  clearRoot () {
    this.$root.innerHTML = '';
  }

  render() {
  }
}