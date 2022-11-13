import { getLabelItemTpl } from '~/tpl';
import { renderInnerHtml } from '~/utils/dom';
import { makeTemplate } from '~/utils/page';
import { LABEL_LIST_SELECTOR } from '~/constants/selector';
import { getElement } from '~/store/element-store';
import type { InitLabelListComponentArgs, RenderLabelListArgs, MakeLabelTemplateArgs } from 'types/label-page';

const render = ({ parent, labels }: RenderLabelListArgs): void => {
  renderInnerHtml({
    parent,
    html: makeTemplate({ arr: labels, templateFunc: getLabelItemTpl })
  });
};

export const initLabelListComponent = ({ parentSelector = LABEL_LIST_SELECTOR, labels }: InitLabelListComponentArgs): void => {
  render({ parent: getElement(parentSelector), labels });
};
