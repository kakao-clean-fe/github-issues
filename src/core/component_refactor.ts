import { convertTemplateToElement, getElement } from '../utils/element';

// TODO wes: 임시 컴포넌트 추후 Component로 변경 예정
export default class ComponentRefactor {
  $target: HTMLElement;
  $root: HTMLElement;
  rootInnerHTML: string;
  state: {};
  props: {};

  constructor ($target, props){
    this.$target = $target;
    this.$root;
    this.rootInnerHTML;
    this.props = props;
    this.state = {};

    this.initState();
    this.created();
  }

  get events () {
    return [];
  }

  get template() {
    return '';
  }

  setState(nextState) {
    this.state = nextState;

    this.render();
  }
  initState() {}
  created () {}
  mounted () {}
  render () {
    this.updateRoot();
    this.clearRoot();
    this.draw();
    this.addEvents();
    this.mounted();
  }
  addEvents() {
    if(this.events) {
      this.events.map(event => this.addEvent(event));
    }
  }
  private updateRoot () {
    this.$root = convertTemplateToElement(this.template) as HTMLElement;
    this.rootInnerHTML = this.$root.innerHTML;
  }
  private isMounted () {
    return this.$target.querySelector(`#${this.$root.id}`);
  }
  private draw () {
    if (this.isMounted()) {
      getElement(`#${this.$root.id}`).innerHTML = this.rootInnerHTML;
    } else {
      this.$target.appendChild(this.$root);
    }
  }
  private clearRoot () {
    if(this.isMounted()) {
      this.$root.innerHTML = ''
    }
  }
  private addEvent ({selector, event, callback}) {
    getElement(selector).addEventListener(event, callback);
  }
}