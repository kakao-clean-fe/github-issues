import { renderInnerHtml } from '~/utils/dom';
import { countArray } from '~/utils/array';
import { LABEL_OPEN_COUNT_SELECTOR } from '~/constants/selector';
import { getElement } from '~/store/element-store';
import type { Labels } from '~/types/label';
import type { InitLabelCountComponentArgs, RenderLabelCountArgs } from '~/types/label-page';

const countLabel = ({ labels }: { labels: Labels }): number => countArray({ arr: labels });

const render = (args: RenderLabelCountArgs): void => {
  renderInnerHtml(args);
};

export const initLabelCountComponent = ({ parentSelector = LABEL_OPEN_COUNT_SELECTOR, labels }: InitLabelCountComponentArgs): void => {
  render({
    parent: getElement(parentSelector),
    html: `${countLabel({ labels })} Labels`
  });
};
