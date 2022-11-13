import { getElement } from '~/store/element-store';
import { getLabelTpl } from '~/tpl';
import { renderInnerHtml } from '~/utils/dom';
import { ROOT_SELECTOR } from '~/constants/selector';
import { InitLabelPageLayoutArgs } from '~/types/label-page';

const render = ({ parent }: { parent: Element | null }): void => {
  renderInnerHtml({
    parent,
    html: getLabelTpl()
  });
};

export const initLabelPageLayout = ({ parentSelector = ROOT_SELECTOR }: InitLabelPageLayoutArgs = {}): void => {
  render({ parent: getElement(parentSelector) });
};
