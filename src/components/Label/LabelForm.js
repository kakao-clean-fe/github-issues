import {Button, Component} from "..";
import { postDataToMSW } from "../../api";
import { LABEL_COLOR, LABEL_NAME_TO_KEY } from "../../constants";
import { labelCreateActionDivStr, labelCreateCancelButtonStr, labelCreateSubmitButtonStr, labelInputDivStr } from "../../constants/template-label";
import { querySelector, querySelectorAll } from "../../utils/dom-selector";

export default class LabelForm extends Component{
  constructor(templateStr, targetQuery, store, appendOption){
    super(templateStr, targetQuery, appendOption);
    this.store = store;
    this.toggleForm();
    this.labelInputDiv = new LabelInputDiv(labelInputDivStr, '#new-label-form', store);

    this.store.subscribe(() => this.toggleForm());
  }
  toggleForm(){
    if(this.store.isOpen){
      this.template.classList.remove('hidden');
    } else {
      this.template.classList.add('hidden');
    }
  }
}

class LabelInputDiv extends Component{
  #childTargetQuery = '#label-input-wrapper';
  constructor(templateStr, targetQuery, store){
    super(templateStr, targetQuery);

    this.store = store; // 새로 생성할 라벨 정보를 가지는 모델
    this.store.subscribe(() => this.updatedLabel());

    this.inputs = querySelectorAll(`${this.#childTargetQuery} input`);
    this.inputs.forEach(inputElement => this.addInputEvent(inputElement));
    this.labelCreateActionDiv = new LabelCreateActionDiv(labelCreateActionDivStr, this.#childTargetQuery, store);
    
    this.changeColorButton = querySelector('#new-label-color');
    this.addChangeLabelColorEvent(this.changeColorButton);
  }
  addInputEvent(inputElement){
    const event = (e) => {
      const key = LABEL_NAME_TO_KEY[e.target.name];
      const newLabel = {...this.store.label};
      newLabel[key] = e.target.value;
      this.store.label = newLabel;
    }
    inputElement.addEventListener('input', event);
  }
  updatedLabel () {
    this.labelCreateActionDiv.setSubmitState(this.checkInputCondition());
    this.setColorTemplate();
    this.setLabelText();
  }
  addChangeLabelColorEvent(element){
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const event = (e) => {
      const label = {...this.store.label};
      label.color = LABEL_COLOR[rand(0,5)];
      this.store.label = label;
    }
    element.addEventListener('click', event);
  }
  setColorTemplate(){
    const color = this.store.label.color;
    [ this.changeColorButton, querySelector('#label-preview')]
      .forEach(element => element.style.backgroundColor = `#${color}`);
    ;
  }
  setLabelText(){
    this.inputs.forEach(inputElement => {
      const key = LABEL_NAME_TO_KEY[inputElement.name];
      const value = this.store.label[key];
      if(value){
        inputElement.value = this.store.label[key];
      }
    })
  }
  checkInputCondition(){
    const label = this.store.label;
    return label.name && label.description && label.color ? true : false;
  }
}
class LabelCreateActionDiv extends Component{
  constructor(templateStr, targetQuery, store) {
    super(templateStr, targetQuery);
    this.cancelButton = new CancelButton(labelCreateCancelButtonStr, '#form-button-group', store);
    this.submitButton = new SubmitButton(labelCreateSubmitButtonStr, '#form-button-group', store);
  }
  setSubmitState(state) {
    this.submitButton.setSubmitState(state);
  }
}
class CancelButton extends Button{
  constructor(templateStr, targetQuery, store) {
    super(templateStr, targetQuery);
    const event = () => store.isOpen = false;
    this.setOnClickListener(this.template, event);
  }
};
class SubmitButton extends Button{
  constructor(templateStr, targetQuery, store) {
    super(templateStr, targetQuery);
    this.state = false;
    this.setOnClickListener(this.template, async (e)=>{
      e.preventDefault();
      const data = await postDataToMSW('/labels', store.label);
      if(data){
        store.labelList = data;
      }
    });
  }
  setSubmitState(state){
    this.state = state;
    this.setButtonTemplate();
  }
  setButtonTemplate(){
    const classList = this.template.classList;
    const className = 'opacity-50';
    if(this.state && classList.contains(className)) {
      classList.remove(className);
      this.template.removeAttribute('disabled');
    }
    if(!this.state && !classList.contains(className)){
      classList.add(className);
      this.template.setAttribute('disabled');
    }
  }
};