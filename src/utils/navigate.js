// Constants
import { mainSelector } from '../constants/selector';

// Utils
import { findElement } from './dom';

// Variables
const rootContainer = findElement(mainSelector.ROOT);

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

// Dynamic Import
export const routes = [
  {
    path: '/',
    element: async () => {
      const { default: IssuePage } = await import('../pages/issuePage');
      const issuePage = new IssuePage(rootContainer);
      issuePage.initPage();
    },
  },
  {
    path: '/issue',
    element: async () => {
      const { default: IssuePage } = await import('../pages/issuePage');
      const issuePage = new IssuePage(rootContainer);
      issuePage.initPage();
    },
  },
  {
    path: '/label',
    element: async () => {
      const { default: LabelPage } = await import('../pages/labelPage');
      const labelPage = new LabelPage(rootContainer);
      labelPage.initPage();
    },
  },
];
