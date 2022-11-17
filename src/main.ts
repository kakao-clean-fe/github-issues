import { clickEventListener } from './common/util';
import Issue from './components/issue/Issue';
import Label from './components/label/Label';
const appDiv = document.querySelector('#app');
const issueBtn = document.querySelector('nav button:nth-child(1)');
const labelBtn = document.querySelector('nav button:nth-child(2)');
clickEventListener(issueBtn, () => Issue(appDiv));
clickEventListener(labelBtn, () => Label(appDiv));
Label(appDiv);
