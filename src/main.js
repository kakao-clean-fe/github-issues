import Header from "./components/Label/Header";
import { getFetchData } from "./api";
import LabelForm from "./components/Label/LabelForm";
import FormStateModel from "./stores/label";

document.querySelector('#app').innerHTML = `
  <div id="label-wrapper" class="w-9/12 m-auto min-w-min">
  </div>
  `;
const labelData = await getFetchData('labels');
const formStateModel = new FormStateModel();
const header = new Header(formStateModel);
const form = new LabelForm(formStateModel);
// document.querySelector('#label-wrapper').appendChild(header.getTemplate());
// document.querySelector('#label-wrapper').appendChild(form.getTemplate());
// const labelList = document.querySelector('.label-list');
// labelData.forEach(item => {
//   const labelListRow = new LabelListRow(item);
//   labelList.appendChild(labelListRow.getElement());
// });
