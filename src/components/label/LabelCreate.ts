import { COLORS } from '../../common/constants';
import FunctionComponent from '../../common/FunctionComponent';
import { getLabelCreateTpl } from '../../common/tpl';
import { pipe } from '../../common/util';
import { ILabelCls, LabelBuilder } from '../../store/LabelStoreClass';
import { labelObserver } from '../../viewModel/LabelObserver';

const LabelCreate = () => {
  const app = FunctionComponent();
  const { getRoot, setComponent, addEventListener, getElement, useState } = app;
  const { subscribe, setCreateHidden, getCreateHidden, addLabel } =
    labelObserver;
  subscribe(app);
  try {
    let newLabel: ILabelCls = new LabelBuilder().build();

    const setCreateLabelBtnEnabled =
      (createLabelBtn: HTMLButtonElement) => (hidden: boolean) => {
        if (hidden) {
          createLabelBtn.classList.add('opacity-50');
          createLabelBtn.classList.remove('opacity-100');
          createLabelBtn.style.cursor = 'not-allowed';
          createLabelBtn.disabled = true;
        } else {
          createLabelBtn.classList.remove('opacity-50');
          createLabelBtn.classList.add('opacity-100');
          createLabelBtn.style.cursor = 'pointer';
          createLabelBtn.disabled = false;
        }
      };

    const createLabelBtnEnabled = (enabled: boolean) =>
      pipe(getElement, setCreateLabelBtnEnabled)('#label-create-button')(
        enabled
      );

    const getEventTargetValue = (e: Event) =>
      (e.target as HTMLInputElement).value;

    addEventListener('#label-name-input', 'input', (e) => {
      const name = getEventTargetValue(e);
      newLabel = new LabelBuilder(newLabel).setName(name).build();
      createLabelBtnEnabled(!newLabel.isFull());
    });
    addEventListener('#label-description-input', 'input', (e) => {
      const description = getEventTargetValue(e);

      newLabel = new LabelBuilder(newLabel).setDescription(description).build();
      createLabelBtnEnabled(!newLabel.isFull());
    });
    addEventListener('.base-outer.p-2.mr-4', 'click', (e) => {
      setCreateHidden(true);
    });

    const getRandomNumber = () => {
      let random = Math.random() * 50;
      while (random > 41) {
        random = Math.random() * 50;
      }
      return Math.floor(random);
    };

    const setBackgroundColor = (querySelector: string) => (color: string) =>
      getElement(querySelector).setAttribute(
        'style',
        `background-color:${color}`
      );

    addEventListener('#new-label-color', 'click', () => {
      let remainSec = 5;
      const interval = setInterval(() => {
        remainSec--;
        const randomColor = COLORS[getRandomNumber()];
        setBackgroundColor('#label-preview')(randomColor);
        setBackgroundColor('#new-label-color')(randomColor);
        const labelColor = getElement('#label-color-value') as HTMLInputElement;
        labelColor.value = randomColor;

        newLabel = new LabelBuilder(newLabel)
          .setColor(labelColor.value.replace('#', ''))
          .build();
        createLabelBtnEnabled(!newLabel.isFull());
        if (remainSec === 0) {
          clearInterval(interval);
        }
      }, 100);
    });

    addEventListener('#label-create-button', 'click', (e) => {
      addLabel(newLabel);
      newLabel = new LabelBuilder().build();
    });
  } catch (error) {}

  return setComponent(
    () => getLabelCreateTpl(getCreateHidden()),
    document.createElement('div')
  );
};

export default LabelCreate;
