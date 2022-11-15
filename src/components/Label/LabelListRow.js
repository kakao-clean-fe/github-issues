
import { Component } from "..";
import { getLabelItemTpl } from "../../tpl";

export default class LabelListRow extends Component{
  constructor(labelData, targetQuery){
    super(getLabelItemTpl(labelData), targetQuery);
    this.labelData = labelData;
  }
  setLabelData = (labelData) => {
    this.labelData = labelData;
  }
}