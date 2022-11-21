import FunctionComponent from '../../common/FunctionComponent';
import LabelCreator from './LabelCreator';
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

  const { setComponent } = app;
  const labelHeader = LabelHeader();
  const labelCreator = LabelCreator();
  const labelList = LabelList();
  return setComponent(() => '', wrapper, labelHeader, labelCreator, labelList);
};

export default Label;
