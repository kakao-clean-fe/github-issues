import { Button } from "..";
export default class NewLabelButton extends Button{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery, model);
    this.setOnClickListener(this.template, this.clickEvent.bind(this));
  }
  clickEvent(){
    this.formModel.isOpen = true;
  }
}