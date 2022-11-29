import { Component, Button } from "..";
import { newLabelButtonStr } from "../../constants/template-label";

export default class Header extends Component{
  constructor(templateStr, targetQuery, store, $document = document){
    super(templateStr, targetQuery, null, $document);
    this.newLabelButton = new NewLabelButton(newLabelButtonStr,'#header', store, $document);
  }
}
export class NewLabelButton extends Button{
  constructor(templateStr, targetQuery, store, $document = document){
    super(templateStr, targetQuery, $document);
    this.setOnClickListener(this.template, () => this.clickEvent(store));
  }
  clickEvent(store){
    store.isOpen = true;
  }
}