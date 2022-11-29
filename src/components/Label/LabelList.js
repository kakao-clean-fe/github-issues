import {Component} from "..";
import { labelListBodyStr, labelListHeaderStr } from "../../constants/template-label";
import { querySelector } from "../../utils/dom-selector";
import { getLabelItemTpl } from "../../tpl";

export default class LabelList extends Component{
  constructor(templateStr, targetQuery, store, $document = document){
    super(templateStr, targetQuery, null, $document);
    this.store = store;
    this.header = new LabelListHeader(labelListHeaderStr, '#labels-wrapper', this.store.labelList.length, $document);
    this.body = new LabelListBody(labelListBodyStr, '#labels-wrapper', this.store.labelList, $document);

    this.store.subscribe(() => this.updatedLabelList());
  }
  updatedLabelList(){
    this.header.setCountTemplate(this.store.labelList.length);
    this.body.updateTemplate(this.store.labelList);
  }
}
export class LabelListBody extends Component{
  constructor(templateStr, targetQuery, labelList, $document = document){
    super(templateStr, targetQuery, null, $document);
    this.targetQuery = targetQuery;
    this.labelTemplates = this.createLabel(labelList);
  }
  updateTemplate(labelList){
    this.template.innerHTML = '';
    this.labelTemplates = this.createLabel(labelList);
    this.render(this.targetQuery);
  }
  createLabel(labelList){
    return labelList.map(labelData => new LabelListRow(labelData, '.label-list', this.$document));
  }
  
}
export class LabelListHeader extends Component{
  constructor(templateStr, targetQuery, count, $document = document){
    super(templateStr, targetQuery, null, $document);
    this.count = count;

    this.setCountTemplate(count);
  }
  setCountTemplate(count){
    querySelector('.open-count', this.$document).innerHTML = `${count} Labels`;
  }
} 
class LabelListRow extends Component{
  constructor(labelData, targetQuery, $document = document){
    super(getLabelItemTpl(labelData), targetQuery, null, $document);
    this.labelData = labelData;
  }
  setLabelData = (labelData) => {
    this.labelData = labelData;
  }
}