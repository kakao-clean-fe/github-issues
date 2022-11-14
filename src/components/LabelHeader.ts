import { eventListener } from './../common/util';
import FunctionComponent from '../common/FunctionComponent';
import { getLabelHeaderTpl } from '../common/tpl';
import { labelObserver } from '../viewModel/LabelObserver';

const LabelHeader = () => {
  const app = FunctionComponent();
  const { getRoot, setComponent, addEventListener, getElement, useState } = app;
  const appDiv = document.createElement('div');
  const { subscribe, setCreateHidden } = labelObserver;
  subscribe(app);

  addEventListener('.new-label-button', 'click', (e) => {
    setCreateHidden(false);
  });
  return setComponent(() => getLabelHeaderTpl(), appDiv);
};

export default LabelHeader;
