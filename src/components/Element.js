export default class Element{
  constructor(model){
    console.log('model', model);
    this.formStateModel = model;
  }
  getTemplate(){
    return this.template;
  }
  render(parent){
    console.log(parent, this.template);
    document.querySelector(parent).append(this.template);
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