import { getLabelTpl, getLabelItemTpl } from '/src/tpl';
import { Q, on, toggleClass, fetchData } from '/src/util/common';
import { $ } from '/src/util/constant';
import LabelStore from '/src/store/LabelStore';
import LabelFormStore from '/src/store/LabelFormStore';

export default class LabelPage {
  constructor(app) {
    this.$app = app;
    this.html = getLabelTpl();
    this.labelStore = null;
    this.labelFormStore = null;
    this.isLabelCreateLazyLoaded = false;
  }
  async init() {
    this.$app.innerHTML = this.html;

    // 라벨 입력 Form 초기세팅
    this.#initLabelForm();

    // Data Fetch
    this.labelStore = new LabelStore();
    this.labelStore.subscribe(this.render.bind(this));
    this.labelStore.fetch();
  }
  async render() {
    const data = this.labelStore.labels;
    Q($.LABEL_LIST).innerHTML = data.map(label => getLabelItemTpl(label)).join('');
  }
  #initLabelForm() {
    // 입력 Form 보이기/숨기기
    on($.LABEL_SHOW_BTN, 'click', this.#onClickLabelShow.bind(this));
    on($.LABEL_HIDE_BTN, 'click', () => toggleClass($.LABEL_FORM, 'hidden', true));

    // 입력 이벤트를 Store에 바인딩
    this.labelFormStore = new LabelFormStore();
    on($.INPUT_LABEL_NAME, 'input', (e) => this.labelFormStore.name = e.target.value);
    on($.INPUT_LABEL_DESCRIPTION, 'input', (e) => this.labelFormStore.description = e.target.value);
    on($.INPUT_LABEL_COLOR, 'input', (e) => {
      this.setColor(e.target.value);
    });

    // 컬러 랜덤 선택기
    on($.LABEL_COLOR_BTN, 'click', () => {
      const getRandomColor = () => Math.floor((Math.random() * 256)).toString(16);
      const r = getRandomColor();
      const g = getRandomColor();
      const b = getRandomColor();
      const color = `${r}${g}${b}`;
      Q($.INPUT_LABEL_COLOR).value = color;
      this.#setColor(color);
    });

    // Update Label
    on($.UPDATE_LABELS_BTN, 'click', () => {
      this.labelStore.update();
    })
  }
  
  #setColor(color) {
    Q($.LABEL_COLOR_BTN).style.background = `#${color}`;
    Q($.LABEL_PREVIEW).style.background = `#${color}`;
    this.labelFormStore.color = color;
  }

  #onClickLabelShow() {
    // 새 라벨 추가 Lazy Load
    if (!this.isLabelCreateLazyLoaded) {
      import('/src/lazy/labelCreate').then(({ initLabelCreate }) => {
        initLabelCreate(this.labelFormStore, this.labelStore);
        this.isLabelCreateLazyLoaded = true;
      });
    }
    toggleClass($.LABEL_FORM, 'hidden', false);
  }
}