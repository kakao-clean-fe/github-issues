import { querySelector } from "../utils/dom-selector";

export class Component{
  constructor(templateStr, targetQuery, appendOption = null, $document = document){
    this.$document = $document;
    this.template = this.convertElement(templateStr);
    this.render(targetQuery, appendOption);
  }
  render(parent, appendOption){
    const parentElement = querySelector(parent, this.$document);
    if(appendOption?.position === 'after') {
      parentElement.after(this.template);
    }else {
      parentElement.append(this.template);
    }
  }
  convertElement(templateStr){
    const div = this.$document.createElement('div');
    div.innerHTML = templateStr.trim();
    return div.firstChild;
  }
}
export class Button extends Component{
  constructor(templateStr, targetQuery, $document = document){
    super(templateStr, targetQuery, null, $document);
  }
  setOnClickListener($target, clickEvent){
    $target.addEventListener('click', clickEvent);
  }
}