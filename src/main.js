import Header from "./components/Header";
import LabelForm from "./components/LabelForm";
import LabelList from "./components/LabelList";
import { getFetchData } from "./api";

const labelData = await getFetchData('labels');
const header = new Header();
const labelForm = new LabelForm();
const labelList = new LabelList(labelData);
document.querySelector('#app').innerHTML = `
  <div id="label-wrapper" class="w-9/12 m-auto min-w-min">
    ${header.getTemplate()}
    ${labelForm.getTemplate()}
    ${labelList.getTemplate()}
  </div>
  `;
// const labelList = document.querySelector('.label-list');
// labelData.forEach(item => {
//   const labelListRow = new LabelListRow(item);
//   labelList.appendChild(labelListRow.getElement());
// });
