import { getLabelItemTpl, getLabelTpl } from '../template/tpl';
import { labelPreviewSelector, newLabelColorSelector, newLabelBtnSelector, labelListContainerSelector, labelCountSelector, labelCreateCancelButtonSelector, formColorValueSelector} from '../template/selector';
import { $ ,addTargetsListener,clearElement, renderPageInApp, setRenderTarget } from '../util/dom';
import { labelStore$, newLabelColorStore$ } from '../store/label';
import { labelFormComponent, formData$ } from './labelForm';
import { compose, pipe } from '../util/operator';

/**
 * week2. 객체지향으로 짜보기
 * label page
 */
export class LabelPage {
  #unsubscribeList = [];

  constructor() {
    this.subscribeStore();

    labelStore$.fetchLabels();
    this.render();
  }

  destroy() {
    labelStore$.unsubscribe(this.#unsubscribeList);
  }

  subscribeStore() {
    // bind한 함수를 unsubscribe 메서드에도 전달해야 한다
    const _renderLabels = this.renderLabels.bind(this);
    const _renderLabelItem = this.renderLabelItem.bind(this);

    labelStore$.subscribe([_renderLabels, this.renderLabelCount]);
    labelStore$.subscribeAdd([_renderLabelItem]);

    this.#unsubscribeList = [_renderLabels, _renderLabelItem, this.renderLabelCount];
  }

  /**
   * render
   */
  render() {
    newLabelColorStore$.addGetNextPropWatchers([this.renderLabelColor.bind(this)]);
    newLabelColorStore$.addSetTempPropWatchers([this.renderLabelColor.bind(this)]);

    // 한 번 쓰는 함수는 지역 함수로 정의
    const renderWrapper = () => renderPageInApp(getLabelTpl());
    const renderInitialLabelColor = () => this.renderLabelColor(newLabelColorStore$.store.cur);

    pipe(
      renderWrapper,
      renderInitialLabelColor,
      this.addNewLabelFormListener.bind(this),
      // test용 임시, new form 보이기
      () => this.toggleLabelForm(),
    )();
  }

  toggleLabelForm() {
    formData$.isCreating = !formData$.isCreating;
  }

  updateLabelColor() {
    formData$.color = newLabelColorStore$.store.next;
  }

  /**
   * add Event Listener
   */
  addNewLabelFormListener() {
    // color 새로고침
    $(newLabelColorSelector).addEventListener('click', this.updateLabelColor);
  
    addTargetsListener([$(newLabelBtnSelector),$(labelCreateCancelButtonSelector)], this.toggleLabelForm);
    labelFormComponent.addFormEventListener();
  }

  // store에 watcher로 > 버튼, 라벨 프리뷰에 색 입히기
  renderLabelCount(labels) {
    $(labelCountSelector).textContent = labels.length;
  }

  // store에 watcher로
  renderLabels(labels) {
    clearElement(labelListContainerSelector);
    
    labels.forEach(label => this.renderLabelItem(label));
  }

  renderLabelItem(label) {
    const wrapper = setRenderTarget($(labelListContainerSelector));
    compose(wrapper, getLabelItemTpl)(label);
  }

  // proxy에서 side effect
  renderLabelColor(newColor) {
    const targetEls = [$(labelPreviewSelector), $(newLabelColorSelector)];

    targetEls.forEach(el => (el.style.backgroundColor = newColor));
    
    // input으로 들어올 수도 있음
    if (newColor !== $(formColorValueSelector).value) {
      $(formColorValueSelector).value = newColor;
    }
  }
}
