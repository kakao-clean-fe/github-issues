import Header from "./components/Label/Header";
import LabelForm from "./components/Label/LabelForm";
import {FormStateModel, LabelListModel} from "./stores/label";
import LabelList from "./components/Label/LabelList";
import { getFetchData } from "./api";

document.querySelector('#app').innerHTML = `
  <div id="label-wrapper" class="w-9/12 m-auto min-w-min">
  </div>
  `;
const formStateModel = new FormStateModel();
const labelListModel = new LabelListModel(await getFetchData('labels'));
const header = new Header(formStateModel);
const form = new LabelForm({label: labelListModel, form: formStateModel});

const labelList = new LabelList(labelListModel);