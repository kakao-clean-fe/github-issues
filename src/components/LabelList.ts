import FunctionComponent from '../common/FunctionComponent';
import { getLabelItemTpl, getLabelListTpl } from '../common/tpl';
import { labelObserver } from '../viewModel/LabelObserver';

const LabelList = () => {
  const app = FunctionComponent();
  const { setComponent } = app;
  const appDiv = document.createElement('div');
  const { subscribe, getLabelCount, getLabelList } = labelObserver;
  subscribe(app);

  return setComponent(
    () =>
      getLabelListTpl(
        getLabelCount(),
        getLabelList().map((label) => getLabelItemTpl(label))
      ),
    appDiv
  );
};

export default LabelList;
