import { getLabelTpl, getLabelItemTpl } from '/src/tpl';
import { Q, on, toggleClass, fetchData } from '/src/util/common';
import LabelStore from '/src/store/LabelStore';
import LabelFormStore from '/src/store/LabelFormStore';

const $ = {
  LABEL_LIST: 'ul.label-list',
  LABEL_SHOW_BTN: '.new-label-button',
  LABEL_HIDE_BTN: '#label-cancel-button',
  LABEL_FORM: '#new-label-form',
  INPUT_LABEL_NAME: '#label-name-input',
  INPUT_LABEL_DESCRIPTION: '#label-description-input',
  INPUT_LABEL_COLOR: '#label-color-value',
  LABEL_CREATE_BTN: '#label-create-button',
  LABEL_COLOR_BTN: '#new-label-color',
  LABEL_PREVIEW: '#label-preview',
}

export default class LabelPage {
  constructor(app) {
    this.$app = app;
    this.html = getLabelTpl();
    this.labelStore = null;
    this.labelFormStore = null;
  }
  async init() {
    this.$app.innerHTML = this.html;

    // 라벨 입력 Form 초기세팅
    this.initLabelForm();

    // Data Fetch
    this.labelStore = new LabelStore(await fetchData('labels'));
    this.labelStore.subscribe(this.render.bind(this));
    this.render();

    // 새 라벨 추가
    this.initLabelCreate();
  }
  async render() {
    const data = this.labelStore.labels;
    Q($.LABEL_LIST).innerHTML = data.map(label => getLabelItemTpl(label)).join('');
  }
  initLabelForm() {
    // 입력 Form 보이기/숨기기
    on($.LABEL_SHOW_BTN, 'click', () => toggleClass($.LABEL_FORM, 'hidden', false));
    on($.LABEL_HIDE_BTN, 'click', () => toggleClass($.LABEL_FORM, 'hidden', true));

    // 입력 이벤트를 Store에 바인딩
    this.labelFormStore = new LabelFormStore();
    on($.INPUT_LABEL_NAME, 'input', (e) => this.labelFormStore.name = e.target.value);
    on($.INPUT_LABEL_DESCRIPTION, 'input', (e) => this.labelFormStore.description = e.target.value);
    on($.INPUT_LABEL_COLOR, 'input', (e) => {
      this.setColor(e.target.value);
    });

    // 컬러 랜덤 선택기
    on($.LABEL_COLOR_BTN, 'click', (e) => {
      const getRandomColor = () => Math.floor((Math.random() * 256)).toString(16);
      const r = getRandomColor();
      const g = getRandomColor();
      const b = getRandomColor();
      const color = `${r}${g}${b}`;
      Q($.INPUT_LABEL_COLOR).value = color;
      this.setColor(color);
    })
  }
  initLabelCreate() {
    on($.LABEL_CREATE_BTN, 'click', () => {
      const newLabel = {
        name: this.labelFormStore.name,
        description: this.labelFormStore.description,
        color: this.labelFormStore.color,
      }
      this.labelStore.addLabel(newLabel); // Observer로 render 메소드 호출
    });
  }
  setColor(color) {
    Q($.LABEL_COLOR_BTN).style.background = `#${color}`;
    Q($.LABEL_PREVIEW).style.background = `#${color}`;
    this.labelFormStore.color = color;
  }
}