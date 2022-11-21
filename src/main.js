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

issueTabButton.addEventListener(EVENT.CLICK, () => {
  createIssuePage();
});

labelTabButton.addEventListener(EVENT.CLICK, async () => {
  // TODO: 프록시 사용 방법 개선
  const labelData = await getLabelData();
  labelDataProxy.labelData = labelData;
});

// createIssuePage();
const labelData = await getLabelData();
labelDataProxy.labelData = labelData;