import { getLabelItemTpl } from '~/tpl';
import { renderInnerHtml } from '~/utils/dom';
import { makeTemplate } from '~/utils/page';
import { LABEL_LIST_SELECTOR } from '~/constants/selector';
import { getElement } from '~/store/element-store';
import type { Labels } from '~/types/label';
import type { LabelListComponentArgs } from '~/types/label-page';
import type { Component } from '~/types/component-interface';

export class LabelList implements Component {
  parent: Element | null = null;
  labelItemTemplateFunction = getLabelItemTpl;
  labels: Labels;

  constructor ({
    parentSelector = LABEL_LIST_SELECTOR,
    labelItemTemplateFunction = getLabelItemTpl,
    labels
  }: LabelListComponentArgs) {
    this.parent = getElement(parentSelector);
    this.labelItemTemplateFunction = labelItemTemplateFunction;
    this.labels = labels;
  }

  init (): void {
    this.render();
  }

  private get template (): string {
    return makeTemplate({ arr: this.labels, templateFunc: getLabelItemTpl });
  }

  render (): void {
    renderInnerHtml({
      parent: this.parent,
      html: this.template
    });
  }
}
