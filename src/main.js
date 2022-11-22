import { initLabelPage } from '~/pages/label-page';
import { worker } from './mocks/browser';
// import { initIssuePage } from '~/pages/issue-page';
if (import.meta.env.DEV) {
  worker.start();
}
// initIssuePage();

initLabelPage();
