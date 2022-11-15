import {Component} from "..";
import LabelListRow from "./LabelListRow";

export default class LabelListBody extends Component{
  constructor(templateStr, targetQuery, labelList){
    super(templateStr, targetQuery);
    this.labelListTemplate = labelList.map(labelData => new LabelListRow(labelData, '.label-list'));
  }
}