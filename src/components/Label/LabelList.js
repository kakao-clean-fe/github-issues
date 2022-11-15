import {Component} from "..";
import { labelListBodyStr, labelListHeaderStr } from "../../constants/template-label";
import { querySelector } from "../../utils/dom-selector";
import { getLabelItemTpl } from "../../tpl";

export default class LabelList extends Component{
  constructor(templateStr, targetQuery, model){
    super(templateStr, targetQuery);
    this.model = model;
    this.header = new LabelListHeader(labelListHeaderStr, '#labels-wrapper', model.labelList.length);
    this.body = new LabelListBody(labelListBodyStr, '#labels-wrapper', model.labelList);
    this.model.subscribe(() => this.updatedLabelList());
  }
  updatedLabelList(){
    this.header.setCountTemplate(this.model.labelList.length);
  }
}
class LabelListBody extends Component{
  constructor(templateStr, targetQuery, labelList){
    super(templateStr, targetQuery);
    this.labelListTemplate = labelList.map(labelData => new LabelListRow(labelData, '.label-list'));
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