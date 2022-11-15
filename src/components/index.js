import { querySelector } from "../utils/dom-selector";

export class Component{
  constructor(templateStr, targetQuery){
    this.template = this.convertElement(templateStr);
    this.render(targetQuery);
  }
  render(parent){
    const parentElement = querySelector(parent);
    parentElement.append(this.template);
  }
  convertElement(templateStr){
    const div = document.createElement('div');
    div.innerHTML = templateStr.trim();
    return div.firstChild;
  }
}
export class Button extends Component{
  constructor(templateStr, targetQuery){
    super(templateStr, targetQuery);
  }
  setOnClickListener($target, clickEvent){
    $target.addEventListener('click', clickEvent);
  }
}