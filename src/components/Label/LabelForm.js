import {Button, Component} from "..";
import { LABEL_COLOR, LABEL_NAME_TO_KEY } from "../../constants";
import { labelCreateActionDivStr, labelCreateCancelButtonStr, labelCreateSubmitButtonStr, labelInputDivStr } from "../../constants/template-label";
import { LabelModel } from "../../stores/label";
import { querySelector, querySelectorAll } from "../../utils/dom-selector";
import { pipe } from "../../utils/pipe";

export default class LabelForm extends Component{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.labelModel = new LabelModel(); // 생성할 라벨 정보를 담는 모델
    this.labelInputDiv = new LabelInputDiv(labelInputDivStr, '#new-label-form', model, this.labelModel);

    model.form.subscribe(() => this.toggleForm());
  }
  toggleForm(){
    this.template.classList.toggle('hidden');
  }
}

class LabelInputDiv extends Component{
  #childTargetQuery = '#label-input-wrapper';
  constructor(templateStr, targetQuery, model, labelModel){
    super(templateStr, targetQuery);

    this.model = labelModel; // 새로 생성할 라벨 정보를 가지는 모델
    this.model.subscribe(() => this.updatedLabel());

    this.inputs = querySelectorAll(`${this.#childTargetQuery} input`);
    this.inputs.forEach(inputElement => this.addInputEvent(inputElement));
    this.labelCreateActionDiv = new LabelCreateActionDiv(labelCreateActionDivStr, this.#childTargetQuery, model, labelModel);
    
    this.changeColorButton = querySelector('#new-label-color');
    this.addChangeLabelColorEvent(this.changeColorButton);
  }
  addInputEvent(inputElement){
    const event = (e) => {
      const key = LABEL_NAME_TO_KEY[e.target.name];
      const newLabel = {...this.model.label};
      newLabel[key] = e.target.value;
      this.model.label = newLabel;
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
      const label = {...this.model.label};
      label.color = LABEL_COLOR[rand(0,5)];
      this.model.label = label;
    }
    element.addEventListener('click', event);
  }
  setColorTemplate(){
    const color = this.model.label.color;
    [ this.changeColorButton, querySelector('#label-preview')]
      .forEach(element => element.style.backgroundColor = `#${color}`);
    ;
  }
  setLabelText(){
    this.inputs.forEach(inputElement => {
      const key = LABEL_NAME_TO_KEY[inputElement.name];
      const value = this.model.label[key];
      if(value){
        inputElement.value = this.model.label[key];
      }
    })
  }
  checkInputCondition(){
    const label = this.model.label;
    return label.name && label.description && label.color ? true : false;
  }
}


class LabelCreateActionDiv extends Component{
  constructor(templateStr, targetQuery, formModel, labelModel) {
    super(templateStr, targetQuery);

    this.cancelButton = new CancelButton(labelCreateCancelButtonStr, '#form-button-group', formModel);
    this.submitButton = new SubmitButton(labelCreateSubmitButtonStr, '#form-button-group', formModel, labelModel);
  }
  setSubmitState(state) {
    this.submitButton.setSubmitState(state);
  }
}
class CancelButton extends Button{
  constructor(templateStr, targetQuery, model) {
    super(templateStr, targetQuery);
    const event = () => model.form.isOpen = false;
    this.setOnClickListener(this.template, event);
  }
};
class SubmitButton extends Button{
  constructor(templateStr, targetQuery, model, labelModel) {
    super(templateStr, targetQuery);
    this.state = false;
    this.setOnClickListener(this.template, (e)=>{
      e.preventDefault();
      model.label.addLabelList(labelModel.label);
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