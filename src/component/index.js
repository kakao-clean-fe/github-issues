export default class Component {
  
  template;
  state;
  target; // Node..
  
  constructor({
    state,
    target,
  }) {
    this.target = target;
    this.setState = this.setState.bind(this);
    this._render = this._render.bind(this);
    
    this.setState(state);
  }
  convertHTMLStringToNode(html) {
    // html string to Node : https://stackoverflow.com/a/35385518
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  on(selector, event, callback) {
    this.select(selector)?.addEventListener(event, callback);
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    };
    this._render();
  }

  select(selector) {
    return this.template?.querySelector(selector);
  }

  _render() {
    if(this.template) {
      this.target.removeChild(this.template);
    }
    this.template = this.render();
    this.target.appendChild(this.template);
    this.setListeners();
  }

  setListeners() {
    // 이벤트 리스너 등록
  }

  render() {
    throw new Error('render 함수는 Node를 return하도록 구현해야 합니다.');
  }
}