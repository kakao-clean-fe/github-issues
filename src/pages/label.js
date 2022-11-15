
import { Component } from "../components";
import Header from "../components/Label/Header";
import LabelForm from "../components/Label/LabelForm";
import LabelList from "../components/Label/LabelList";
import { FormStateModel, LabelListModel } from "../stores/label";
import { labelFormStr, labelHeaderStr, labelListStr } from "../constants/template-label";

export default class LabelPage extends Component {
  constructor(templateStr, targetQuery, labelList){
    super(templateStr, targetQuery);

    this.formModel = new FormStateModel();
    this.labelModel = new LabelListModel(labelList);

    this.header = new Header(labelHeaderStr,'#label-wrapper',this.formModel);
    this.labelForm = new LabelForm(labelFormStr,'#label-wrapper',{label: this.labelModel, form: this.formModel});
    this.labelList = new LabelList(labelListStr, '#label-wrapper', this.labelModel);
  }
}