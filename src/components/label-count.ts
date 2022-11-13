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
  labels: Labels;

  constructor ({
    parentSelector = LABEL_OPEN_COUNT_SELECTOR,
    templateFunction = makeLabelCountTemplate,
    labels
  }: LabelCountComponentArgs) {
    this.parent = getElement(parentSelector);
    this.templateFunction = templateFunction;
    this.labels = labels;
  }

  init (): void {
    this.render();
  }

  private get template (): string {
    const labelCount = countArray({ arr: this.labels });
    return this.templateFunction(labelCount);
  }

  render (): void {
    renderInnerHtml({
      parent: this.parent,
      html: this.template
    });
  }
}
