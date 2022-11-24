import { clickEventListener } from './common/util';
import Issue from './components/issue/Issue';
import { worker } from '../mocks/browser';
const appDiv = document.querySelector('#app');
const issueBtn = document.querySelector('nav button:nth-child(1)');
const labelBtn = document.querySelector('nav button:nth-child(2)');
clickEventListener(issueBtn, () => Issue(appDiv));
clickEventListener(labelBtn, () =>
  import('./components/label/Label.js').then((Label) => Label.default(appDiv))
);
Issue(appDiv);
//msw worker
worker.start();
