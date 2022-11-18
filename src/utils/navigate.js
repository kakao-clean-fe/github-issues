// Pages
import IssuePage from '../pages/issuePage';
import LabelPage from '../pages/labelPage';

// Constants
import { mainSelector } from '../constants/selector';

// Utils
import { findElement } from './dom';

// Variables
const rootContainer = findElement(mainSelector.ROOT);
const issuePage = new IssuePage(rootContainer);
const labelPage = new LabelPage(rootContainer);

export const BASE_URL = 'http://localhost:5173/';

/**
 * @param { string } to
 * @param { boolean } isReplace
 */
export const navigate = (to, isReplace = false) => {
  const historyChangeEvent = new CustomEvent('historychange', {
    detail: {
      to,
      isReplace,
    },
  });

  dispatchEvent(historyChangeEvent);
};

export const routes = [
  { path: '/', element: () => issuePage.initPage() },
  { path: '/issue', element: () => issuePage.initPage() },
  { path: '/label', element: () => labelPage.initPage() },
];
