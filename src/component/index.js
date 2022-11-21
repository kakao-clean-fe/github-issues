export default class Component {
  template; // 랜더링 할 컴포넌트 Node
  state;
  target; // 랜더링 할 부모 Node..

  constructor({ state, target }) {
    this.target = target;
    this.setState = this.setState.bind(this);
    this._render = this._render.bind(this);
    this.setState(state);
  }
  convertHTMLStringToNode(html) {
    // html string to Node : https://stackoverflow.com/a/35385518
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  on(selector, event, callback) {
    const nodes = this.selectAll(selector);

    nodes.forEach((node) =>
      node.addEventListener(event, (e) => {
        e.preventDefault();
        callback(e);
      })
    );
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

  selectAll(selector) {
    return this.template?.querySelectorAll(selector);
  }
  
  _render() {
    const prevTemplate = this.template;
    this.render();
    this._replaceDOM(prevTemplate);
    this.setListeners();
  }
  
  _replaceDOM(prevTemplate) {
    if(prevTemplate && this.template) {
      return this.target.replaceChild(this.template, prevTemplate);
    } 

    if(!prevTemplate) {
      return this.target.appendChild(this.template);
    }

    return this.target.removeChild(prevTemplate);
  }

  setListeners() {
    // 이벤트 리스너 등록
  }

  render() {
    throw new Error("render 함수는 Node를 return하도록 구현해야 합니다.");
  }
}
