import { getLabelItemTpl } from "../tpl";
import Element from "./Element";

export default class LabelListRow extends Element{
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