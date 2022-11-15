import {Component} from "..";
import { querySelector } from "../../utils/dom-selector";
export default class LabelListHeader extends Component{
  constructor(templateStr, targetQuery, count){
    super(templateStr, targetQuery);
    this.count = count;

    this.setCountTemplate(count);
  }
  setCountTemplate(count){
    querySelector('.open-count').innerHTML = `${count} Labels`;
  }
}