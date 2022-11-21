// Components
import { BaseComponent } from '../components/component';
import LabelItem from '../components/label/labelItem';

// Templates
import { getLabelTpl } from '../template/label';

// Constants
import { labelSelector } from '../constants/selector';

// Utils
import { findElement } from '../utils/dom';
import { reduce } from '../utils/fx';

// Api
import LabelApi from '../api/label';

// Store
import LabelStore, {
  SET_LABEL_LIST,
  SET_LABEL_ITEM,
  ADD_LABEL,
} from '../store/labelStore';

export default class LabelPage extends BaseComponent {
  constructor($container) {
    super(getLabelTpl());

    this.$container = $container;
  }

  initPage = async () => {
    // 데이터 패치
    const labels = await LabelApi.fetchLabels();

    // 페이지 렌더링
    this.attatchTo(this.$container);

    // subscribe 등록
    LabelStore.subscribe(SET_LABEL_LIST, this.renderLabels);
    LabelStore.subscribe(SET_LABEL_LIST, this.renderLabelCount);
    LabelStore.subscribe(SET_LABEL_ITEM, this.validateForm);
    LabelStore.subscribe(ADD_LABEL, this.addLabel);
    LabelStore.subscribe(ADD_LABEL, this.renderLabelCount);

    // action 호출
    LabelStore.dispatch({
      type: SET_LABEL_LIST,
      payload: labels,
    });

    // 이벤트 등록
    const newLabelButton = findElement(labelSelector.NEW_LABEL_BUTTON);
    newLabelButton.addEventListener('click', this.onNewLabelButtonClick);
  };

  renderLabelCount = () => {
    const labelCountArea = findElement(labelSelector.LABEL_COUNT);
    labelCountArea.innerText = `${
      LabelStore.getState().labelList.length
    } Labels`;
  };

  clearLabels = () => {
    while (findElement(labelSelector.LABEL_LIST).firstChild) {
      findElement(labelSelector.LABEL_LIST).removeChild(
        findElement(labelSelector.LABEL_LIST).firstChild
      );
    }
  };

  renderLabels = () => {
    // 기존에 그려진 리스트 비워주기
    this.clearLabels();

    const labelList = LabelStore.getState().labelList;
    labelList.forEach((label) => {
      const labelItem = new LabelItem(label);
      labelItem.attatchTo(findElement(labelSelector.LABEL_LIST), 'beforeend');
    });
  };

  addLabel = () => {
    const newLabel = LabelStore.getState().labelItem;
    const labelItem = new LabelItem(newLabel);
    labelItem.attatchTo(findElement(labelSelector.LABEL_LIST), 'beforeend');
  };

  onNewLabelButtonClick = async () => {
    const labelFormWrapper = findElement(labelSelector.LABEL_FORM_WRAPPER);

    // Dynamic Import
    if (!labelFormWrapper.firstChild) {
      await (async () => {
        const { default: LabelForm } = await import(
          '../components/label/labelForm'
        );
        const labelForm = new LabelForm();
        labelForm.attatchTo(labelFormWrapper, 'beforeend');
      })();

      // 이벤트 등록
      const labelNameInput = findElement(labelSelector.LABEL_NAME_INPUT);
      labelNameInput.addEventListener('input', this.onLabelNameInputChange);

      const labelDescriptionInput = findElement(
        labelSelector.LABEL_DESCRIPTION_INPUT
      );
      labelDescriptionInput.addEventListener(
        'input',
        this.onLabelDescriptionInputChange
      );

      const newLabelColorButton = findElement(labelSelector.NEW_LABEL_COLOR);
      newLabelColorButton.addEventListener(
        'click',
        this.onNewLabelColorButtonClick
      );

      const labelCancelButton = findElement(labelSelector.LABEL_CANCEL_BUTTON);
      labelCancelButton.addEventListener(
        'click',
        this.onLabelCancelButtonClick
      );

      const labelSubmitButton = findElement(labelSelector.LABEL_INPUT_FORM);
      labelSubmitButton.addEventListener('submit', this.onSubmit);
    }

    labelFormWrapper.classList.remove('hidden');
  };

  onLabelNameInputChange = (e) => {
    const labelItem = { ...LabelStore.getState().labelItem };
    labelItem.name = e.target.value;
    LabelStore.dispatch({
      type: SET_LABEL_ITEM,
      payload: labelItem,
    });
  };

  onLabelDescriptionInputChange = (e) => {
    const labelItem = { ...LabelStore.getState().labelItem };
    labelItem.description = e.target.value;
    LabelStore.dispatch({
      type: SET_LABEL_ITEM,
      payload: labelItem,
    });
  };

  onNewLabelColorButtonClick = () => {
    const labelPreview = findElement(labelSelector.LABEL_PREVIEW);
    const newLabelColorButton = findElement(labelSelector.NEW_LABEL_COLOR);
    const labelColorInput = findElement(labelSelector.LABEL_COLOR_VALUE);

    const [r, g, b] = this.randomRgb();
    const colorStyle = `background-color: rgb(${r}, ${g}, ${b})`;
    newLabelColorButton.style = colorStyle;
    labelPreview.style = colorStyle;

    const labelItem = { ...LabelStore.getState().labelItem };
    const hexRgb = this.rgbToHex([r, g, b]);
    labelColorInput.value = `#${hexRgb}`;
    labelItem.color = hexRgb;
    LabelStore.dispatch({
      type: SET_LABEL_ITEM,
      payload: labelItem,
    });
  };

  onLabelCancelButtonClick = () => {
    const labelFormWrapper = findElement(labelSelector.LABEL_FORM_WRAPPER);
    labelFormWrapper.classList.add('hidden');
  };

  onSubmit = (e) => {
    e.preventDefault();

    LabelStore.dispatch({
      type: ADD_LABEL,
    });
  };

  randomRgb = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return [r, g, b];
  };

  rgbToHex = (rgb) => {
    return reduce(
      (a, b) => {
        return (
          a +
          (b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16))
        );
      },
      '',
      rgb
    );
  };

  validateForm = () => {
    const labelCreateButton = findElement(labelSelector.LABEL_CREATE_BUTTON);
    const labelItem = LabelStore.getState().labelItem;

    let flag = true;
    Object.keys(labelItem).forEach((key) => {
      // 하나라도 입력이 안 된 것이 있다면
      if (!labelItem[key]) {
        flag = false;
      }
    });

    if (flag) {
      labelCreateButton.disabled = false;
      labelCreateButton.classList.remove('opacity-50');
    } else {
      labelCreateButton.disabled = true;
      labelCreateButton.classList.add('opacity-50');
    }
  };
}
