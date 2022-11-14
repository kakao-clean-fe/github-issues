import { getLabelItemTpl } from "../tpl";

export default class LabelListRow {
  constructor(labelData){
    this.labelData = labelData;
    this.template = getLabelItemTpl(this.labelData);
  }
  getTemplate = () => this.template;
  setLabelData = (labelData) => {
    this.labelData = labelData;
  }
}