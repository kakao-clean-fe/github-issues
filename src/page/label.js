import { getLabelItemTpl, getLabelTpl } from '../template/tpl';
import { newLabelBtnSelector, labelListContainerSelector, labelCountSelector, updateLabelSelector, labelWrapperSelector} from '../template/selector';
import { getTargetQuerySelector ,addClickEventListener, clearElement, setRenderTarget, renderWrapper } from '../util/dom';
import { labelStore$ } from '../store/label';
import { compose, pipe } from '../util/operator';
import { formData$ } from '../store/labelForm';
import {addSubscribe as _addSubscribe} from '../util/feature';

/**
 * week2. 객체지향으로 짜보기
 * label page
 */
export class LabelPage {
  #labelWrapper$ = null;
  #labelForm = null;
  #unsubscribeList = [];

  constructor() {
    this.subscribeStore();

    labelStore$.fetchLabels();
  }

  destroy() {
    labelStore$.unsubscribe(this.#unsubscribeList);

    this.#labelForm?.destroy();
    this.#labelForm = null;
  }

  subscribeStore() {
    const addSubscribe = _addSubscribe(this, this.#unsubscribeList);
    
    // bind한 함수를 unsubscribe 메서드에도 전달해야 한다
    labelStore$.subscribe([addSubscribe(this.renderLabels), addSubscribe(this.renderLabelCount)]);
    labelStore$.subscribeAdd([addSubscribe(this.renderLabelItem)]);
  }

  addLabelPageEventListener() {
    addClickEventListener(this.#labelWrapper$(newLabelBtnSelector), () => this.toggleLabelForm()),
    addClickEventListener(this.#labelWrapper$(updateLabelSelector), () => labelStore$.updateLabels());
  }

  /**
   * render: app에서 호출
   */
  render(targetEl) {
    pipe(
      renderWrapper(targetEl)(getLabelTpl()),
      () => {(this.#labelWrapper$ = getTargetQuerySelector(targetEl)(labelWrapperSelector))},
      this.addLabelPageEventListener.bind(this)
      // test용 임시, new form 보이기
      // () => this.toggleLabelForm(),
    )();
  }

  checkLabelFormExist() {
    if (this.#labelForm !== null) {
      return true;
    }

    /**
     * [ TO DO ] MSW warning 처리하기
     * Warning: captured a request without a matching request handler:
     * • GET /src/page/labelForm.js
     * prefetch 적용은 SPA라 보류...
     */
    import('./labelForm').then(({LabelFormComponent}) => {
      this.#labelForm = new LabelFormComponent();

      formData$.isCreating = !formData$.isCreating;
    })

    return false;
  }

  toggleLabelForm() {
    if (this.checkLabelFormExist()) {
      formData$.isCreating = !formData$.isCreating;
    }
  }

  // store에 watcher로 > 버튼, 라벨 프리뷰에 색 입히기
  renderLabelCount(labels) {
    this.#labelWrapper$(labelCountSelector).textContent = labels.length;
  }

  // store에 watcher로
  renderLabels(labels) {
    clearElement(labelListContainerSelector);
    
    labels.forEach(label => this.renderLabelItem(label));
  }

  renderLabelItem(label) {
    const wrapper = setRenderTarget(this.#labelWrapper$(labelListContainerSelector));
    compose(wrapper, getLabelItemTpl)(label);
  }
}
