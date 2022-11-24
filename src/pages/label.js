
import { Component } from "../components";
import Header from "../components/Label/Header";
import LabelList from "../components/Label/LabelList";
import UpdateLabelButton from "../components/Label/UpdateLabelButton";
import { LabelStore } from "../stores/label";
import { labelFormStr, labelHeaderStr, labelListStr, updateLabelButtonStr } from "../constants/template-label";

export default class LabelPage extends Component {
  constructor(templateStr, targetQuery, labelList){
    super(templateStr, targetQuery);
    this.store = new LabelStore(labelList);
    this.store.subscribe(() => this.createLabelForm());
    this.header = new Header(labelHeaderStr,'#label-wrapper', this.store);
    
    this.labelList = new LabelList(labelListStr, '#label-wrapper', this.store);
    this.updateLabelButton = new UpdateLabelButton(updateLabelButtonStr, '#label-wrapper', this.store);
  }
  async createLabelForm(){
    if(this.store.isOpen && !this.labelForm){
      const { default : LabelForm } = await import("../components/Label/LabelForm");
      this.labelForm = new LabelForm(labelFormStr,'#header', this.store, { position:'after' });
    }
  }
}
