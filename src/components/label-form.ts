import { LABEL_FORM_SELECTOR, CREATE_LABEL_BUTTON_SELECTOR, LABEL_NAME_INPUT_SELECTOR, LABEL_INPUT_WRAPPER, LABEL_DESCRIPTION_INPUT_SELECTOR, LABEL_COLOR_INPUT_SELECTOR } from '~/constants/selector';
import { addElementToDOM, removeElementFromDOM } from '~/utils/page';
import type { Component } from '~/types/component-interface';
import { addClass, disableButton, enableButton, removeClass, setEventListenerToElement } from '~/utils/dom';
import { getElement } from '~/store/element-store';
import { DISABLED_CREATE_BUTTON_CLASS } from '~/tpl';
import { labelStore } from '~/store/label-store';
import { Label } from '~/types/label';

export class LabelForm implements Component {
  readonly DISABLED_CREATE_BUTTON_CLASS = 'opacity-50';

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

  init (): void {
    this.render();
    this.initEventHandler();
  }

  render (): void {
    addElementToDOM(this.$labelForm);
  }

  initEventHandler (): void {
    this.addSubmitLabelFormHandler();
    this.addInputLabelNameHandler();
  }

  unmount (): void {
    removeElementFromDOM(this.$labelForm);
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

  private isValidForm (): boolean {
    return !!(this.$labelNameInput?.value.length);
  }

  private addInputLabelNameHandler (): void {
    const inputNameHandler = (event: Event): void => {
      event.stopPropagation();
      if (this.$labelNameInput === null) {
        return;
      }
      if (this.isValidForm()) {
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

  private getLabelFormData (): Label {
    return {
      name: this.$labelNameInput?.value ?? '',
      description: 'description',
      color: 'red'
    };
  }

  private addSubmitLabelFormHandler (): void {
    const submitLabelForm = (event: Event): void => {
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
    };

    const submitLabelFormHandler = (event: Event): void => {
      submitLabelForm(event);
    };
    setEventListenerToElement({
      element: this.$labelForm,
      event: 'submit',
      eventHandler: submitLabelFormHandler
    });
  }
}
