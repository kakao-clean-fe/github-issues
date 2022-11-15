import { Component, Button } from "..";
import { newLabelButtonStr } from "../../constants/template-label";

export default class Header extends Component{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.newLabelButton = new NewLabelButton(newLabelButtonStr,'#header', model);
  }
}
class NewLabelButton extends Button{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.setOnClickListener(this.template, () => this.clickEvent(model));
  }
  clickEvent(model){
    model.isOpen = true;
  }
}