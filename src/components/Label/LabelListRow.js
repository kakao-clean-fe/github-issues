
import Component from "..";
import { getLabelItemTpl } from "../../tpl";

export default class LabelListRow extends Component{
  constructor(labelData){
    super();
    this.labelData = labelData;
    this.template = this.convertElement(getLabelItemTpl(this.labelData));
    this.render('.label-list');
  }
  getTemplate = () => this.template;
  setLabelData = (labelData) => {
    this.labelData = labelData;
  }
}