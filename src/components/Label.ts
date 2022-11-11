import FunctionComponent from '../common/FunctionComponent';
import { getLabelTpl } from '../common/tpl';

// label view 에 관한 로직만
const Label = (appDiv: Element) => {
  const { getRoot, setComponent } = FunctionComponent();
  setComponent(() => getLabelTpl(), appDiv);
  return getRoot().innerHTML;
};

export default Label;
