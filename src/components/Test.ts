import { Item } from '../../types';
import FunctionComponent from '../common/FunctionComponent';
import { getIssueItemTpl } from '../common/tpl';

// issue의 view 에 관한 로직만
const Test = () => {
  const { addEventListener, getRoot, setComponent, getElement } =
    FunctionComponent();

  addEventListener('#test', 'click', () => {
    alert('wef');
  });
  setComponent(
    () => `
      <div id="test" style="width:100px;height:100px;background-color:yellow;border-radius:10px;">

      </div>
    `,
    document.createElement('div')
  );
  return getRoot();
};

export default Test;
