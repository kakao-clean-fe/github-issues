import { LABEL_FORM_SELECTOR, CREATE_LABEL_BUTTON_SELECTOR, LABEL_NAME_INPUT_SELECTOR, LABEL_INPUT_WRAPPER, LABEL_DESCRIPTION_INPUT_SELECTOR, LABEL_COLOR_INPUT_SELECTOR, CANCEL_CREATE_LABEL_BUTTON } from '~/constants/selector';
import { addElementToDOM, removeElementFromDOM } from '~/utils/page';
import type { Component } from '~/types/component-interface';
import { addClass, clearInputValue, disableButton, enableButton, removeClass, setEventListenerToElement } from '~/utils/dom';
import { getElement } from '~/store/element-store';
import { DISABLED_CREATE_BUTTON_CLASS } from '~/tpl';
import { labelStore } from '~/store/label-store';
import { Label } from '~/types/label';

export class LabelForm implements Component {
  isEventHandlerInitialized = false;

  get $inputWrapper (): Element | null {
    return getElement({
      selector: LABEL_INPUT_WRAPPER
    });
  }

  get $labelForm (): Element | null {
    return getElement({
      selector: LABEL_FORM_SELECTOR
    });
  }

  get $createButton (): HTMLButtonElement | null {
    return getElement({
      fromElement: this.$inputWrapper,
      selector: CREATE_LABEL_BUTTON_SELECTOR
    }) as HTMLButtonElement;
  }

  get $nameInput (): HTMLInputElement | null {
    return getElement({
      fromElement: this.$inputWrapper,
      selector: LABEL_NAME_INPUT_SELECTOR
    }) as HTMLInputElement;
  }

  get $descriptionInput (): HTMLInputElement | null {
    return getElement({
      fromElement: this.$inputWrapper,
      selector: LABEL_DESCRIPTION_INPUT_SELECTOR
    }) as HTMLInputElement;
  }

  get $colorInput (): HTMLInputElement | null {
    return getElement({
      fromElement: this.$inputWrapper,
      selector: LABEL_COLOR_INPUT_SELECTOR
    }) as HTMLInputElement;
  }

  get $cancelButton (): HTMLButtonElement | null {
    return getElement({
      fromElement: this.$inputWrapper,
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
  }

  initEventHandler (): void {
    this.addSubmitFormHandler();
    this.addInputNameHandler();
    this.addClickCancelButtonHandler();
    this.isEventHandlerInitialized = true;
  }

  private addClickCancelButtonHandler (): void {
    setEventListenerToElement({
      element: this.$cancelButton,
      event: 'click',
      eventHandler: () => this.unmount()
    });
  }

  private addInputNameHandler (): void {
    setEventListenerToElement({
      element: this.$nameInput,
      event: 'input',
      eventHandler: (event) => this.nameInputHandler(event)
    });
  }

  private nameInputHandler (event: Event): void {
    event.stopPropagation();
    if (this.$nameInput === null) {
      return;
    }
    if (this.isValidForm()) {
      this.enableCreateLabelButton();
    } else {
      this.disableCreateLabelButton();
    }
  }

  private isValidForm (): boolean {
    return !!(this.$nameInput?.value.length);
  }

  private enableCreateLabelButton (): void {
    if (this.$createButton === null) {
      return;
    }
    removeClass(this.$createButton, DISABLED_CREATE_BUTTON_CLASS);
    enableButton(this.$createButton);
  }

  private disableCreateLabelButton (): void {
    if (this.$createButton === null) {
      return;
    }
    addClass(this.$createButton, DISABLED_CREATE_BUTTON_CLASS);
    disableButton(this.$createButton);
  }

  private getFormData (): Label {
    return {
      name: this.$nameInput?.value ?? '',
      description: 'description',
      color: 'red'
    };
  }

  private addSubmitFormHandler (): void {
    setEventListenerToElement({
      element: this.$labelForm,
      event: 'submit',
      eventHandler: (event) => this.submitFormHandler(event)
    });
  }

  private submitForm (event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (!this.isValidForm()) {
      console.error('invalid form');
      return;
    }

    const newLabels = [
      ...labelStore.state.labels,
      this.getFormData()
    ];

    labelStore.setLabels(newLabels);
  }

  private clearAllInputValue (): void {
    const inputElements = [this.$nameInput, this.$descriptionInput, this.$colorInput];
    inputElements.forEach(clearInputValue);
  }

  private submitFormHandler (event: Event): void {
    this.submitForm(event);
    this.clearAllInputValue();
    this.unmount();
  }
}
