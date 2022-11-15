import {Button, Component} from "..";
import { labelColorInputStr, labelCreateActionDivStr, labelCreateCancelButtonStr, labelCreateSubmitButtonStr, labelDescriptionInputStr, labelInputDivStr, labelNameInputStr } from "../../constants/template-label";

export default class LabelForm extends Component{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.labelInputDiv = new LabelInputDiv(labelInputDivStr, '#new-label-form', model);

    model.form.subscribe(this.toggleForm.bind(this));
  }
  toggleForm(){
    this.template.classList.toggle('hidden');
  }
}

class LabelInputDiv extends Component{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.labelNameInput = new LabelNameInput(labelNameInputStr ,'#label-input-wrapper');
    this.labelDescriptionInput = new LabelDescriptionInput(labelDescriptionInputStr, '#label-input-wrapper');
    this.labelColorInput = new LabelColorInput(labelColorInputStr,'#label-input-wrapper');
    this.labelCreateActionDiv = new LabelCreateActionDiv(labelCreateActionDivStr, '#label-input-wrapper', model);
  }
}

class LabelNameInput extends Component{
  constructor(templateStr, targetQuery) {
    super(templateStr, targetQuery);
  }
}
class LabelDescriptionInput extends Component{
  constructor(templateStr, targetQuery) {
    super(templateStr, targetQuery);
  }
}
class LabelColorInput extends Component{
  constructor(templateStr, targetQuery) {
    super(templateStr, targetQuery);
  }
}
class LabelCreateActionDiv extends Component{
  constructor(templateStr, targetQuery, formModel) {
    super(templateStr, targetQuery);

    this.cancelButton = new CancelButton(labelCreateCancelButtonStr, '#form-button-group', formModel);
    this.submitButton = new SubmitButton(labelCreateSubmitButtonStr, '#form-button-group', formModel);
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
  constructor(templateStr, targetQuery, model) {
    super(templateStr, targetQuery);
    // const event = () => formModel.isOpen = false;
    this.setOnClickListener(this.template, (e)=>{
      const newLabel = {name: 'enhancement', color: 'a2eeef', description: 'thi'};
      model.label.addLabelList(newLabel);
    });
  }
};