import { getLabelItemTpl } from "../tpl";
import Component from "..";

export default class LabelListRow extends Component{
  constructor(labelData){
    super();
    this.labelData = labelData;
    this.template = getLabelItemTpl(this.labelData);
  }
  getTemplate = () => this.template;
  setLabelData = (labelData) => {
    this.labelData = labelData;
  }
}