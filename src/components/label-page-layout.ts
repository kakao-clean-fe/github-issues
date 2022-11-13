import { getElement } from '~/store/element-store';
import { getLabelTpl } from '~/tpl';
import { renderInnerHtml } from '~/utils/dom';
import { ROOT_SELECTOR } from '~/constants/selector';
import type { LabelPageLayoutArgs } from '~/types/label-page';
import type { Component } from '~/types/component-interface';

export class LabelPageLayout implements Component {
  parent: Element | null = null;
  templateFunction = getLabelTpl;

  constructor ({
    parentSelector = ROOT_SELECTOR,
    templateFunction = getLabelTpl
  }: LabelPageLayoutArgs = {}) {
    this.parent = getElement(parentSelector);
    this.templateFunction = templateFunction;
  }

  init (): void {
    this.render();
  }

  private get template (): string {
    return this.templateFunction();
  }

  render (): void {
    renderInnerHtml({
      parent: this.parent,
      html: this.template
    });
  }
}
