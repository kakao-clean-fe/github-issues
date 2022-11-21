import { LABEL_FORM_SELECTOR, CREATE_LABEL_BUTTON_SELECTOR, LABEL_NAME_INPUT_SELECTOR, LABEL_INPUT_WRAPPER, LABEL_DESCRIPTION_INPUT_SELECTOR, LABEL_COLOR_INPUT_SELECTOR, CANCEL_CREATE_LABEL_BUTTON } from '~/constants/selector';
import { addElementToDOM, removeElementFromDOM } from '~/utils/page';
import type { Component } from '~/types/component-interface';
import { addClass, disableButton, enableButton, removeClass, setEventListenerToElement, clearEventListenerToElement } from '~/utils/dom';
import { getElement } from '~/store/element-store';
import { DISABLED_CREATE_BUTTON_CLASS } from '~/tpl';
import { labelStore } from '~/store/label-store';
import { Label } from '~/types/label';

export class LabelForm implements Component {
  isEventHandlerInitialized = false;

  get $labelInputWrapper (): Element | null {
    return getElement({
      selector: LABEL_INPUT_WRAPPER
    });
  }

  get $labelForm (): Element | null {
    return getElement({
      selector: LABEL_FORM_SELECTOR
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

  get $cancelButton (): HTMLButtonElement | null {
    return getElement({
      fromElement: this.$labelInputWrapper,
      selector: CANCEL_CREATE_LABEL_BUTTON
    }) as HTMLButtonElement;
  }

  init (): void {
    this.render();
    if (!this.isEventHandlerInitialized) {
      this.initEventHandler();
    }
  }

  render (): void {
    addElementToDOM(this.$labelForm);
  }

  unmount (): void {
    removeElementFromDOM(this.$labelForm);
    this.clearEventHandler();
  }

  initEventHandler (): void {
    this.addSubmitLabelFormHandler();
    this.addInputLabelNameHandler();
    this.addClickCancelButtonHandler();
    this.isEventHandlerInitialized = true;
  }

  clearEventHandler (): void {
    clearEventListenerToElement({
      element: this.$labelNameInput,
      event: 'input',
      eventHandler: this.labelNameInputHandler.bind(this)
    });

    clearEventListenerToElement({
      element: this.$labelForm,
      event: 'submit',
      eventHandler: this.submitLabelFormHandler.bind(this)
    });
    this.isEventHandlerInitialized = true;
  }

  private addClickCancelButtonHandler (): void {
    setEventListenerToElement({
      element: this.$cancelButton,
      event: 'click',
      eventHandler: () => { this.unmount(); }
    });
  }

  private addInputLabelNameHandler (): void {
    setEventListenerToElement({
      element: this.$labelNameInput,
      event: 'input',
      eventHandler: this.labelNameInputHandler.bind(this)
    });
  }

  private labelNameInputHandler (event: Event) {
    event.stopPropagation();
    if (this.$labelNameInput === null) {
      return;
    }
    if (this.isValidForm()) {
      this.enableCreateLabelButton();
    } else {
      this.disableCreateLabelButton();
    }
  }

  private isValidForm (): boolean {
    return !!(this.$labelNameInput?.value.length);
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

  private getLabelFormData (): Label {
    return {
      name: this.$labelNameInput?.value ?? '',
      description: 'description',
      color: 'red'
    };
  }

  private addSubmitLabelFormHandler (): void {
    setEventListenerToElement({
      element: this.$labelForm,
      event: 'submit',
      eventHandler: this.submitLabelFormHandler.bind(this)
    });
  }

  private submitLabelForm (event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (!this.isValidForm()) {
      console.error('invalid form');
      return;
    }

    const newLabels = [
      ...labelStore.state.labels,
      this.getLabelFormData()
    ];

    labelStore.setLabels(newLabels);
  }

  private submitLabelFormHandler (event: Event): void {
    this.submitLabelForm(event);
    this.unmount();
  }
}
