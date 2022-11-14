import { LabelBuilder, ILabelCls } from '../store/LabelStoreClass';
import FunctionComponent from '../common/FunctionComponent';
import { getLabelContainerTpl } from '../common/tpl';
import LabelCreate from './LabelCreate';
import LabelHeader from './LabelHeader';
import LabelList from './LabelList';

// label view 에 관한 로직만
const Label = (appDiv: Element) => {
  appDiv.innerHTML = '';
  const app = FunctionComponent();
  const wrapper = document.createElement('div');
  wrapper.id = 'label-wrapper';
  wrapper.className = 'w-9/12 m-auto min-w-min';
  appDiv.appendChild(wrapper);

  const { getRoot, setComponent, addEventListener, getElement, useState } = app;
  const labelHeader = LabelHeader();
  const labelCreate = LabelCreate();
  const labelList = LabelList();
  setComponent(() => '', wrapper, labelHeader, labelCreate, labelList);
  return getRoot();
};

export default Label;
