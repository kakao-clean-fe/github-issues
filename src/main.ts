import { clickEventListener } from './common/util';
import App from './components/App';
import Issue from './components/Issue';
import Label from './components/Label';
const appDiv = document.querySelector('#app');
const issueBtn = document.querySelector('nav button:nth-child(1)');
const labelBtn = document.querySelector('nav button:nth-child(2)');

clickEventListener(issueBtn, () => App(appDiv));
clickEventListener(labelBtn, () => Label(appDiv));

App(appDiv);
