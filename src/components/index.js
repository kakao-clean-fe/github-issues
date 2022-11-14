import { querySelector } from "../utils/dom-selector";

export default class Component{
  constructor(model){
    this.formStateModel = model;
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
  setOnClickListener($target, clickEvent){
    $target.addEventListener('click', clickEvent);
  }
}