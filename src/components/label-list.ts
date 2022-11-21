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

  constructor ({
    parentSelector = LABEL_LIST_SELECTOR,
    labelItemTemplateFunction = getLabelItemTpl
  }: LabelListComponentArgs = {}) {
    this.parent = getElement({ selector: parentSelector });
    this.labelItemTemplateFunction = labelItemTemplateFunction;
  }

  init ({ labels }: { labels: Labels }): void {
    this.render({ labels });
  }

  getTemplate ({ labels }: { labels: Labels }): string {
    return makeTemplate({ arr: labels, templateFunc: getLabelItemTpl });
  }

  render ({ labels }: { labels: Labels }): void {
    renderInnerHtml({
      parent: this.parent,
      html: this.getTemplate({ labels })
    });
  }
}
