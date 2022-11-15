import {Component} from "..";
import { newLabelButtonStr } from "../../constants/template-label";
import NewLabelButton from "./NewLabelButton";
export default class Header extends Component{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.newLabelButton = new NewLabelButton(newLabelButtonStr,'#header', model);
  }
}