import {Component} from "..";
import { labelListBodyStr, labelListHeaderStr } from "../../constants/template-label";
import LabelListBody from "./LabelListBody";
import LabelListHeader from "./LabelListHeader";

export default class LabelList extends Component{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.model = model;
    this.header = new LabelListHeader(labelListHeaderStr, '#labels-wrapper', model.labelList.length);
    this.body = new LabelListBody(labelListBodyStr, '#labels-wrapper', model.labelList);
    this.model.subscribe(this.updatedLabelList.bind(this));
  }
  updatedLabelList(){
    this.header.setCountTemplate(this.model.labelList.length);
  }
}