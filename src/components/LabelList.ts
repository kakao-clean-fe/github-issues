import FunctionComponent from '../common/FunctionComponent';
import {
  getLabelHeaderTpl,
  getLabelItemTpl,
  getLabelListTpl,
} from '../common/tpl';
import { labelObserver } from '../viewModel/LabelObserver';

const LabelList = () => {
  const app = FunctionComponent();
  const { getRoot, setComponent, addEventListener, getElement, useState } = app;
  const appDiv = document.createElement('div');
  const {
    subscribe,
    setCreateHidden,
    getCreateHidden,
    getLabelCount,
    getLabelList,
    addLabel,
  } = labelObserver;
  subscribe(app);

  setComponent(
    () =>
      getLabelListTpl(
        getLabelCount(),
        getLabelList().map((label) => getLabelItemTpl(label))
      ),
    appDiv
  );

  return getRoot();
};

export default LabelList;
