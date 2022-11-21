import { getDataFromMSW } from "./api";
import { labelPageStr } from "./constants/template-label";
import LabelPage from "./pages/label";
import { worker } from './mocks/browser';
import { issuePage } from "./pages/issue";
import { querySelector, querySelectorAll } from "./utils/dom-selector";

worker.start({
  onUnhandledRequest: 'bypass',
});

const labelList = await getDataFromMSW('/labels');
new LabelPage(labelPageStr, '#app', labelList);

(async () => {
  const buttonClickEvent = (e) => {
    // #app 내부 초기화
    querySelector('#app').innerHTML = '';
    const name = e.target.innerHTML;
    switch(name){
      case 'Label':
        new LabelPage(labelPageStr, '#app', labelList);
        break;
      case 'Issue':
        issuePage();
        break;
      default:
        break;
    }
  }
  querySelectorAll('#nav>button').forEach(button=>{
    button.addEventListener('click', buttonClickEvent);
  })
})();