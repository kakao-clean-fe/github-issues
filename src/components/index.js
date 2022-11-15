import { querySelector } from "../utils/dom-selector";

export class Component{
  constructor(templateStr, targetQuery, model){
    this.template = this.convertElement(templateStr);
    this.render(targetQuery);
    
    this.formModel = model;
  }
  getTemplate(){
    return this.template;
  }
  render(parent, remove = false){
    const parentElement = querySelector(parent);
    if(remove) {
      parentElement.innerHTML = '';
    }
    parentElement.append(this.template);
  }
  convertElement(templateStr){
    const div = document.createElement('div');
    div.innerHTML = templateStr.trim();
    return div.firstChild;
  }
}

export class Button extends Component{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery, model);
  }
  setOnClickListener($target, clickEvent){
    $target.addEventListener('click', clickEvent);
  }
}