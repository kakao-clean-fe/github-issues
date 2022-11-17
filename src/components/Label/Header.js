import { Component, Button } from "..";
import { newLabelButtonStr } from "../../constants/template-label";

export default class Header extends Component{
  constructor(templateStr, targetQuery, store){
    super(templateStr, targetQuery);
    this.newLabelButton = new NewLabelButton(newLabelButtonStr,'#header', store);
  }
}
class NewLabelButton extends Button{
  constructor(templateStr, targetQuery, store){
    super(templateStr, targetQuery);
    this.setOnClickListener(this.template, () => this.clickEvent(store));
  }
  clickEvent(store){
    store.isOpen = true;
  }
}