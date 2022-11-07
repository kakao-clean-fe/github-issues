import { convertTemplateToElement, getElement } from '../utils/element';

export default class Component {
  constructor ({$target, template, events}){
    this.$root;
    this.$target = $target;
    this.template = template;
    this.events = events
    
    this.renderRoot();
    this.addEvents();
  }
  
  renderRoot () {
    this.$root = convertTemplateToElement(this.template);
    this.$target.appendChild(this.$root);
  }

  addEvents() {
    if(this.events) {
      this.events.map(event => this.addEvent(event));
    }
  }

  addEvent ({selector, event, callback}) {
    getElement(selector).addEventListener(event, callback);
  }

  render() {
  }
}