import { querySelector } from "../utils/dom-selector";

export class Component{
  constructor(templateStr, targetQuery, appendOption = null){
    this.template = this.convertElement(templateStr);
    this.render(targetQuery, appendOption);
  }
  render(parent, appendOption){
    const parentElement = querySelector(parent);
    if(appendOption?.position === 'after') {
      parentElement.after(this.template);
    }else {
      parentElement.append(this.template);
    }
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