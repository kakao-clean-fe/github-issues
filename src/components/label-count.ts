import { getElement } from '~/store/element-store';
import { renderInnerHtml } from '~/utils/dom';
import { LABEL_OPEN_COUNT_SELECTOR } from '~/constants/selector';
import type { LabelCountComponentArgs } from '~/types/label-page';
import type { Component } from '~/types/component-interface';
import type { Labels } from '~/types/label';
import { countArray } from '~/utils/array';

const makeLabelCountTemplate = (count: number): string => `${count} Labels`;

export class LabelCount implements Component {
  parent: Element | null = null;
  templateFunction = makeLabelCountTemplate;

  constructor ({
    parentSelector = LABEL_OPEN_COUNT_SELECTOR,
    templateFunction = makeLabelCountTemplate
  }: LabelCountComponentArgs = {}) {
    this.parent = getElement({ selector: parentSelector });
    this.templateFunction = templateFunction;
  }

  init ({ labels }: { labels: Labels }): void {
    this.render({ labels });
  }

  getTemplate ({ labels }: { labels: Labels }): string {
    const labelCount = countArray({ arr: labels });
    return this.templateFunction(labelCount);
  }

  render ({ labels }: { labels: Labels }): void {
    renderInnerHtml({
      parent: this.parent,
      html: this.getTemplate({ labels })
    });
  }
}
