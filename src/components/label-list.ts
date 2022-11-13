import { getLabelItemTpl } from '~/tpl';
import { renderInnerHtml } from '~/utils/dom';
import { reduceArray } from '~/utils/array';
import { LABEL_LIST_SELECTOR } from '~/constants/selector';
import { getElement } from '~/store/element-store';
import type { Label } from '~/types/label';
import type { InitLabelListComponentArgs, RenderLabelListArgs, MakeLabelTemplateArgs } from 'types/label-page';

const makeLabelTemplate = ({ labels, templateFunc }: MakeLabelTemplateArgs): string => {
  return reduceArray({
    arr: labels,
    initValue: '',
    reducer: (template: string, label: Label) => `${template}${templateFunc(label)}`
  });
};

const render = ({ parent, labels }: RenderLabelListArgs): void => {
  renderInnerHtml({
    parent,
    html: makeLabelTemplate({ labels, templateFunc: getLabelItemTpl })
  });
};

export const initLabelListComponent = ({ parentSelector = LABEL_LIST_SELECTOR, labels }: InitLabelListComponentArgs): void => {
  render({ parent: getElement(parentSelector), labels });
};
