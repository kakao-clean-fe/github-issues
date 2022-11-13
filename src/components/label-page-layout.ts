import { getElement } from '~/store/element-store';
import { getLabelTpl } from '~/tpl';
import { renderInnerHtml } from '~/utils/dom';
import { ROOT_SELECTOR } from '~/constants/selector';
import { InitLabelPageLayoutArgs } from '~/types/label-page';
import { Component } from '~/types/component-interface';

export class LabelPageLayout implements Component {
  parent: Element | null = null;
  templateFunction = getLabelTpl;

  constructor ({
    parentSelector = ROOT_SELECTOR,
    templateFunction = getLabelTpl
  }: InitLabelPageLayoutArgs = {}) {
    this.parent = getElement(parentSelector);
    this.templateFunction = templateFunction;
  }

  init (): void {
    this.render();
  }

  render (): void {
    renderInnerHtml({
      parent: this.parent,
      html: this.templateFunction()
    });
  }
}
