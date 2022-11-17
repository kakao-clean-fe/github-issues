import { getFetchData } from "./api";
import { labelPageStr } from "./constants/template-label";
import LabelPage from "./pages/label";

const labelList = await getFetchData('labels');
new LabelPage(labelPageStr, '#app', labelList);