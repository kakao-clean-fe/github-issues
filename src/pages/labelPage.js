// Components
import { BaseComponent } from '../components/component';
import { LabelItem } from '../components/label/labelItem';

// Templates
import { getLabelTpl } from '../tpl';

// Constants
import {
  ROOT,
  LABEL_COUNT,
  NEW_LABEL_BUTTON,
  LABEL_INPUT_FORM,
  LABEL_NAME_INPUT,
  LABEL_DESCRIPTION_INPUT,
  NEW_LABEL_COLOR,
  LABEL_COLOR_VALUE,
  LABEL_PREVIEW,
  LABEL_CANCEL_BUTTON,
  LABEL_CREATE_BUTTON,
  LABEL_LIST,
} from '../constants/selector';

// Utils
import { findElement } from '../utils/dom';

// Api
import LabelApi from '../api/label';

// Store
import LabelStore, {
  SET_LABEL_LIST,
  SET_LABEL_ITEM,
  ADD_LABEL,
} from '../store/labelStore';

export class LabelPage extends BaseComponent {
  constructor() {
    super(getLabelTpl());
  }

  #rootEl = null;

  initPage = async () => {
    // 데이터 패치
    const labels = await LabelApi.fetchLabels();

    // 루트 선택 및 페이지 렌더링
    this.#rootEl = findElement(ROOT);
    this.attatchTo(this.#rootEl);

    // subscribe 등록
    LabelStore.subscribe(SET_LABEL_LIST, this.loadLabelPage);
    LabelStore.subscribe(SET_LABEL_ITEM, this.validateForm);
    LabelStore.subscribe(ADD_LABEL, this.renderLabels);
    LabelStore.subscribe(ADD_LABEL, this.renderLabelCount);

    // action 호출
    LabelStore.dispatch({
      type: SET_LABEL_LIST,
      payload: labels,
    });

    // 이벤트 등록
    const newLabelButton = findElement(NEW_LABEL_BUTTON);
    newLabelButton.addEventListener('click', this.onNewLabelButtonClick);

    const labelNameInput = findElement(LABEL_NAME_INPUT);
    labelNameInput.addEventListener('input', this.onLabelNameInputChange);

    const labelDescriptionInput = findElement(LABEL_DESCRIPTION_INPUT);
    labelDescriptionInput.addEventListener(
      'input',
      this.onLabelDescriptionInputChange
    );

    const newLabelColorButton = findElement(NEW_LABEL_COLOR);
    newLabelColorButton.addEventListener(
      'click',
      this.onNewLabelColorButtonClick
    );

    const labelCancelButton = findElement(LABEL_CANCEL_BUTTON);
    labelCancelButton.addEventListener('click', this.onLabelCancelButtonClick);

    const labelSubmitButton = findElement(LABEL_INPUT_FORM);
    labelSubmitButton.addEventListener('submit', this.onSubmit);
  };

  loadLabelPage = () => {
    this.removeFrom(this.#rootEl);
    this.setElement(getLabelTpl());
    this.attatchTo(this.#rootEl);

    // 라벨 리스트 렌더링
    this.renderLabels();
  };

  renderLabelCount = () => {
    const labelCountArea = findElement(LABEL_COUNT);
    labelCountArea.innerText = `${
      LabelStore.getState().labelList.length
    } Labels`;
  };

  clearLabels = () => {
    while (findElement(LABEL_LIST).firstChild) {
      findElement(LABEL_LIST).removeChild(findElement(LABEL_LIST).firstChild);
    }
  };

  renderLabels = () => {
    // 기존에 그려진 리스트 비워주기
    this.clearLabels();

    const labelList = LabelStore.getState().labelList;
    labelList.forEach((label) => {
      const labelItem = new LabelItem(label);
      labelItem.attatchTo(findElement(LABEL_LIST), 'beforeend');
    });
  };

  onNewLabelButtonClick = () => {
    const labelInputForm = findElement(LABEL_INPUT_FORM);
    labelInputForm.classList.remove('hidden');
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
    const labelPreview = findElement(LABEL_PREVIEW);
    const newLabelColorButton = findElement(NEW_LABEL_COLOR);
    const labelColorInput = findElement(LABEL_COLOR_VALUE);

    const [r, g, b] = this.randomRgb();
    const colorStyle = `background-color: rgb(${r}, ${g}, ${b})`;
    newLabelColorButton.style = colorStyle;
    labelPreview.style = colorStyle;

    const labelItem = { ...LabelStore.getState().labelItem };
    const hexRgb = this.rgbToHex(r, g, b);
    labelColorInput.value = `#${hexRgb}`;
    labelItem.color = hexRgb;
    LabelStore.dispatch({
      type: SET_LABEL_ITEM,
      payload: labelItem,
    });
  };

  onLabelCancelButtonClick = () => {
    const labelInputForm = findElement(LABEL_INPUT_FORM);
    labelInputForm.classList.add('hidden');
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

  rgbToHex = (r, g, b) => {
    r = r.toString(16).length === 1 ? '0' + r.toString(16) : r.toString(16);
    g = g.toString(16).length === 1 ? '0' + g.toString(16) : g.toString(16);
    b = b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16);

    return r + g + b;
  };

  validateForm = () => {
    const labelCreateButton = findElement(LABEL_CREATE_BUTTON);
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
