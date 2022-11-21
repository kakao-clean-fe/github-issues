import { LABEL_FORM_SELECTOR, CREATE_LABEL_BUTTON_SELECTOR, LABEL_NAME_INPUT_SELECTOR, LABEL_INPUT_WRAPPER, LABEL_DESCRIPTION_INPUT_SELECTOR, LABEL_COLOR_INPUT_SELECTOR } from '~/constants/selector';
import { displayBlockBySelector } from '~/utils/page';
import type { Component } from '~/types/component-interface';
import { addClass, addClickEventListener, disableButton, enableButton, removeClass, setEventListenerToElement } from '~/utils/dom';
import { getElement } from '~/store/element-store';
import { DISABLED_CREATE_BUTTON_CLASS } from '~/tpl';
export class LabelForm implements Component {
  readonly DISABLED_CREATE_BUTTON_CLASS = 'opacity-50';

  get $labelInputWrapper (): Element | null {
    return getElement({
      selector: LABEL_INPUT_WRAPPER
    });
  }

  get $createLabelButton (): HTMLButtonElement | null {
    return getElement({
      fromElement: this.$labelInputWrapper,
      selector: CREATE_LABEL_BUTTON_SELECTOR
    }) as HTMLButtonElement;
  }

  get $labelNameInput (): HTMLInputElement | null {
    return getElement({
      fromElement: this.$labelInputWrapper,
      selector: LABEL_NAME_INPUT_SELECTOR
    }) as HTMLInputElement;
  }

  init (): void {
    this.render();
    this.initEventHandler();
  }

  render (): void {
    displayBlockBySelector({ selector: LABEL_FORM_SELECTOR });
  }

  initEventHandler (): void {
    this.addCreateLabelHandler();
    this.addInputLabelNameHandler();
  }

  private enableCreateLabelButton (): void {
    if (this.$createLabelButton === null) {
      return;
    }
    removeClass(this.$createLabelButton, DISABLED_CREATE_BUTTON_CLASS);
    enableButton(this.$createLabelButton);
  }

  private disableCreateLabelButton (): void {
    if (this.$createLabelButton === null) {
      return;
    }
    addClass(this.$createLabelButton, DISABLED_CREATE_BUTTON_CLASS);
    disableButton(this.$createLabelButton);
  }

  private addInputLabelNameHandler (): void {
    const inputNameHandler = (event: Event): void => {
      event.stopPropagation();
      if (this.$labelNameInput === null) {
        return;
      }
      if (this.$labelNameInput.value.length) {
        this.enableCreateLabelButton();
      } else {
        this.disableCreateLabelButton();
      }
    };
    setEventListenerToElement({
      element: this.$labelNameInput,
      event: 'input',
      eventHandler: inputNameHandler
    });
  }

  private addCreateLabelHandler (): void {
    const submitLabelForm = (event) => {
      return event;
    };
    addClickEventListener({
      element: this.$createLabelButton,
      eventHandler: submitLabelForm.bind(this)
    });
  }
}
