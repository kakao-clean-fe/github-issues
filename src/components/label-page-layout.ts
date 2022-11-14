import { getElement } from '~/store/element-store';
import { getLabelTpl } from '~/tpl';
import { renderInnerHtml, addClickEventListener } from '~/utils/dom';
import { ROOT_SELECTOR, NEW_LABEL_BUTTON_SELECTOR } from '~/constants/selector';
import type { LabelPageLayoutArgs } from '~/types/label-page';
import type { Component } from '~/types/component-interface';

export class LabelPageLayout implements Component {
  parent: Element | null = null;
  templateFunction = getLabelTpl;
  labelFormComponent;

  constructor ({
    parentSelector = ROOT_SELECTOR,
    templateFunction = getLabelTpl,
    labelFormComponent
  }: LabelPageLayoutArgs) {
    this.parent = getElement(parentSelector);
    this.templateFunction = templateFunction;
    this.labelFormComponent = labelFormComponent;
  }

  init (): void {
    this.render();
    this.setEventHandler();
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

  private setNewLabelButtonHandler (): void {
    addClickEventListener({
      element: getElement(NEW_LABEL_BUTTON_SELECTOR),
      eventHandler: this.labelFormComponent.init.bind(this.labelFormComponent)
    });
  }

  setEventHandler (): void {
    this.setNewLabelButtonHandler();
  }
}
