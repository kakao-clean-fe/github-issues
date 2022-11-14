import { SELECTOR } from './constants/selector';
import {selectElement } from './utils/dom';
import { createIssuePage } from './pages/issues';
import { EVENT } from './constants/event';
import { LabelPage } from './pages/label';
import { fetchLabelsData } from './common/api';
import { labelDataProxy } from './store/dataStore';

const issueTabButton = selectElement(SELECTOR.ISSUE_TAB);
const labelTabButton = selectElement(SELECTOR.LABEL_TAB);

issueTabButton.addEventListener(EVENT.CLICK, () => {
  createIssuePage();
});

labelTabButton.addEventListener(EVENT.CLICK, async () => {
  const labelData = await fetchLabelsData();
  labelDataProxy.labelData = labelData;
});

createIssuePage();