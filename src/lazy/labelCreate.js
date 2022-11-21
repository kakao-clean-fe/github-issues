import { on } from '/src/util/common';
import { $ } from '/src/util/constant';

export const initLabelCreate = (labelFormStore, labelStore) => {
  on($.LABEL_CREATE_BTN, 'click', () => {
    const newLabel = {
      name: labelFormStore.name,
      description: labelFormStore.description,
      color: labelFormStore.color,
    }
    labelStore.addLabel(newLabel); // Observer로 render 메소드 호출
  });
}