import { Button } from "..";
export default class NewLabelButton extends Button{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.setOnClickListener(this.template, () => this.clickEvent(model));
  }
  clickEvent(model){
    model.isOpen = true;
  }
}