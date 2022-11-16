import {Component} from "..";
import { labelListBodyStr, labelListHeaderStr } from "../../constants/template-label";
import { querySelector } from "../../utils/dom-selector";
import { getLabelItemTpl } from "../../tpl";

export default class LabelList extends Component{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.labelListModel = model;
    this.header = new LabelListHeader(labelListHeaderStr, '#labels-wrapper', this.labelListModel.labelList.length);
    this.body = new LabelListBody(labelListBodyStr, '#labels-wrapper', this.labelListModel.labelList);

    this.labelListModel.subscribe(() => this.updatedLabelList());
  }
  updatedLabelList(){
    this.header.setCountTemplate(this.labelListModel.labelList.length);
    this.body.updateTemplate(this.labelListModel.labelList);
  }
}
class LabelListBody extends Component{
  constructor(templateStr, targetQuery, labelList){
    super(templateStr, targetQuery);
    this.targetQuery = targetQuery;
    this.labelTemplates = this.createLabel(labelList);
  }
  updateTemplate(labelList){
    this.template.innerHTML = '';
    this.labelTemplates = this.createLabel(labelList);
    this.render(this.targetQuery);
  }
  createLabel(labelList){
    return labelList.map(labelData => new LabelListRow(labelData, '.label-list'));
  }
  
}
class LabelListHeader extends Component{
  constructor(templateStr, targetQuery, count){
    super(templateStr, targetQuery);
    this.count = count;

    this.setCountTemplate(count);
  }
  setCountTemplate(count){
    querySelector('.open-count').innerHTML = `${count} Labels`;
  }
} 
class LabelListRow extends Component{
  constructor(labelData, targetQuery){
    super(getLabelItemTpl(labelData), targetQuery);
    this.labelData = labelData;
  }
  setLabelData = (labelData) => {
    this.labelData = labelData;
  }
}