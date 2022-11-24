import FunctionComponent from '../../common/FunctionComponent';
import { getLabelCreateTpl } from '../../common/tpl';
import { pipe } from '../../common/util';
import { ILabelCls, LabelCls } from '../../store/LabelStoreClass';
import { labelObserver } from '../../viewModel/LabelObserver';

const LabelCreator = () => {
  const app = FunctionComponent();
  const {
    getRoot,
    setComponent,
    addEventListener,
    getElement,
    useState,
    addAfterRender,
  } = app;
  const { subscribe, setCreateHidden, getCreateHidden, addLabel } =
    labelObserver;
  subscribe(app);
  let newLabel: ILabelCls = new LabelCls.builder()
    .setData('name', localStorage.getItem('name') || '')
    .setData('color', localStorage.getItem('color') || '')
    .setData('description', localStorage.getItem('description') || '')
    .build();
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
    pipe(getElement, setCreateLabelBtnEnabled)('#label-create-button')(enabled);

  const getEventTargetValue = (e: Event) =>
    (e.target as HTMLInputElement).value;

  const addEventListenerToNameOrDescription = (key: 'name' | 'description') =>
    addEventListener(`#label-${key}-input`, 'input', (e) => {
      const value = getEventTargetValue(e);
      newLabel = new LabelCls.builder(newLabel).setData(key, value).build();
      createLabelBtnEnabled(!newLabel.isFull());
    });

  addEventListenerToNameOrDescription('name');
  addEventListenerToNameOrDescription('description');
  addEventListener('.base-outer.p-2.mr-4', 'click', (e) => {
    setCreateHidden(true);
  });

  const setBackgroundColor = (querySelector: string) => (color: string) =>
    getElement(querySelector).setAttribute(
      'style',
      `background-color:${color}`
    );

  addEventListener('#new-label-color', 'click', () => {
    let remainSec = 5;
    const interval = setInterval(() => {
      remainSec--;
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
        16
      )}`;
      setBackgroundColor('#label-preview')(randomColor);
      setBackgroundColor('#new-label-color')(randomColor);
      const labelColor = getElement('#label-color-value') as HTMLInputElement;
      labelColor.value = randomColor;
      const replacedColor = labelColor.value.replace('#', '');

      newLabel = new LabelCls.builder(newLabel)
        .setData('color', replacedColor)
        .build();
      createLabelBtnEnabled(!newLabel.isFull());
      if (remainSec === 0) {
        clearInterval(interval);
      }
    }, 100);
  });

  addEventListener('#label-create-button', 'click', (e) => {
    e.preventDefault();
    addLabel(newLabel);
    newLabel = new LabelCls.builder().build();
    localStorage.clear();
  });

  addAfterRender(() => {
    (getElement('#label-name-input') as HTMLInputElement).value = newLabel.name;
    (getElement('#label-description-input') as HTMLInputElement).value =
      newLabel.description;
    (
      getElement('#label-color-value') as HTMLInputElement
    ).value = `#${newLabel.color}`;
  });

  return setComponent(
    () => getLabelCreateTpl(getCreateHidden()),
    document.createElement('div')
  );
};

export default LabelCreator;
