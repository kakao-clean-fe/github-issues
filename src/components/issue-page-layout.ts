import { getElement } from '~/store/element-store';
import { getIssueTpl } from '~/tpl.js';
import { renderInnerHtml } from '~/utils/dom';

const render = ({ parent }: { parent: Element | null }): void => {
  renderInnerHtml({
    parent,
    html: getIssueTpl()
  });
};

export const initIssuePageLayout = ({ parentSelector }: { parentSelector: string }): void => {
  render({ parent: getElement({ selector: parentSelector }) });
};
