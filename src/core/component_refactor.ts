import { convertTemplateToElement, getElement } from '../utils/element';

// TODO wes: 임시 컴포넌트 추후 Component로 변경 예정
export default class ComponentRefactor {
  $target: HTMLElement;
  state: {};
  props: {};

  constructor ($target, props){
    this.$target = $target;
    this.props = props;
    this.state = {}

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
    this.clearInnerHTML();
    this.$target.appendChild(convertTemplateToElement(this.template) as HTMLElement);
    
    this.addEvents();
    this.mounted();
  }
  addEvents() {
    if(this.events) {
      this.events.map(event => this.addEvent(event));
    }
  }
  private clearInnerHTML () {
    this.$target.innerHTML = '';
  }
  private addEvent ({selector, event, callback}) {
    getElement(selector).addEventListener(event, callback);
  }
}