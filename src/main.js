import { getDataFromMSW } from "./api";
import { labelPageStr } from "./constants/template-label";
import LabelPage from "./pages/label";
import { worker } from './mocks/browser';

worker.start({
  onUnhandledRequest: 'bypass',
});

const labelList = await getDataFromMSW('/labels');
new LabelPage(labelPageStr, '#app', labelList);