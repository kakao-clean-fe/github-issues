
import { Component } from "../components";
import Header from "../components/Label/Header";
import LabelForm from "../components/Label/LabelForm";
import LabelList from "../components/Label/LabelList";
import { LabelStore } from "../stores/label";
import { labelFormStr, labelHeaderStr, labelListStr } from "../constants/template-label";

export default class LabelPage extends Component {
  constructor(templateStr, targetQuery, labelList){
    super(templateStr, targetQuery);

    this.store = new LabelStore(labelList);

    this.header = new Header(labelHeaderStr,'#label-wrapper', this.store);
    this.labelForm = new LabelForm(labelFormStr,'#label-wrapper', this.store);
    this.labelList = new LabelList(labelListStr, '#label-wrapper', this.store);
  }
}