import { getElement } from '~/store/element-store';
import { getLabelTpl } from '~/tpl';
import { renderInnerHtml, addClickEventListener } from '~/utils/dom';
import { ROOT_SELECTOR, NEW_LABEL_BUTTON_SELECTOR, UPDATE_LABEL_BUTTON_SELECTOR } from '~/constants/selector';
import type { LabelPageLayoutArgs } from '~/types/label-page';
import type { Component } from '~/types/component-interface';
import { labelStore } from '~/store/label-store';

export class LabelPageLayout implements Component {
  parent: Element | null = null;
  templateFunction = getLabelTpl;

  get $updateLabelButton (): HTMLButtonElement | null {
    return getElement({ selector: UPDATE_LABEL_BUTTON_SELECTOR }) as HTMLButtonElement;
  }

  get $newLabelButton (): HTMLButtonElement | null {
    return getElement({ selector: NEW_LABEL_BUTTON_SELECTOR }) as HTMLButtonElement;
  }

  constructor ({
    parentSelector = ROOT_SELECTOR,
    templateFunction = getLabelTpl
  }: LabelPageLayoutArgs = {}) {
    this.parent = getElement({ selector: parentSelector });
    this.templateFunction = templateFunction;
  }

  init (): void {
    this.render();
    this.initEventHandler();
  }

  getTemplate (): string {
    return this.templateFunction();
  }

  render (): void {
    renderInnerHtml({
      parent: this.parent,
      html: this.getTemplate()
    });
  }

  initEventHandler (): void {
    this.addNewLabelButtonHandler();
    this.addUpdateLabelButtonHandler();
  }

  private addNewLabelButtonHandler (): void {
    addClickEventListener({
      element: this.$newLabelButton,
      eventHandler: () => {
        import('~/components/label-form')
          .then(({ LabelForm }) => new LabelForm().init())
          .catch((e) => console.error(e));
      }
    });
  }

  private addUpdateLabelButtonHandler (): void {
    addClickEventListener({
      element: this.$updateLabelButton,
      eventHandler: () => labelStore.fetchAndSetLabels({ delay: true })
    });
  }
}
