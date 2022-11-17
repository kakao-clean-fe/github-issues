import { LABEL_FORM_SELECTOR } from '~/constants/selector';
import { displayBlockBySelector } from '~/utils/page';
import type { Component } from '~/types/component-interface';

export class LabelForm implements Component {
  init (): void {
    this.render();
  }

  render (): void {
    displayBlockBySelector(LABEL_FORM_SELECTOR);
  }
}
