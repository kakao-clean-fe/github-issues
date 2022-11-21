import { SELECTOR } from './constants/selector';
import {selectElement } from './utils/dom';
import { createIssuePage } from './pages/issues';
import { EVENT } from './constants/event';
import { getLabelData } from './common/api';
import { labelDataProxy } from './store/dataStore';
import { worker } from './mocks/browser';

// msw worker
worker.start();

const issueTabButton = selectElement(SELECTOR.ISSUE_TAB);
const labelTabButton = selectElement(SELECTOR.LABEL_TAB);

const initLabelPage = async () => {
  const labelData = await getLabelData();
  labelDataProxy.labelData = labelData;
}

issueTabButton.addEventListener(EVENT.CLICK, () => {
  createIssuePage();
});

labelTabButton.addEventListener(EVENT.CLICK, () => {
  initLabelPage();
});

// createIssuePage();
initLabelPage();