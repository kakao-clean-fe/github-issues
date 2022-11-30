import { getElement } from '~/store/element-store';
import { get404PageTpl } from '~/tpl';
import { renderInnerHtml } from '~/utils/dom';

const render = () => {
  renderInnerHtml({
    parent: getElement({ selector: 'body' }),
    html: get404PageTpl()
  });
};
export const init404Page = () => {
  render();
};
