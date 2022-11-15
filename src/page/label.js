import { getLabelItemTpl, getLabelTpl } from '../template/tpl';
import { labelPreviewSelector, newLabelColorSelector, newLabelBtnSelector, labelListContainerSelector, labelCountSelector, labelCreateCancelButtonSelector, formColorValueSelector} from '../template/selector';
import { $ ,addTargetsListener,clearElement, renderPageInApp, setRenderTarget } from '../util/dom';
import { getLabelStore$, newLabelColorStore$ } from '../store/label';
import { labelFormComponent, formData$ } from './labelForm';
import { compose, pipe } from '../util/operator';

/**
 * week2. 객체지향으로 짜보기
 * label page
 */
export const labelPage = {
  toggleLabelForm() {
    formData$.isCreating = !formData$.isCreating;
  },
  updateLabelColor() {
    formData$.color = newLabelColorStore$.next;
  },
  /**
   * add Event Listener
   */
  addNewLabelFormListener() {
    // color 새로고침
    $(newLabelColorSelector).addEventListener('click', this.updateLabelColor);
  
    addTargetsListener([$(newLabelBtnSelector),$(labelCreateCancelButtonSelector)], this.toggleLabelForm);
    labelFormComponent.addFormEventListener();
  },
  // store에 watcher로
  renderLabelCount(labels) {
    $(labelCountSelector).textContent = labels.length;
  },

  // store에 watcher로
  renderLabelItem(labels) {
    clearElement(labelListContainerSelector);

    const wrapper = setRenderTarget($(labelListContainerSelector));
    labels.forEach(label => compose(wrapper, getLabelItemTpl)(label));
  },
  // proxy에서 side effect
  renderLabelColor(newColor) {
    const targetEls = [$(labelPreviewSelector), $(newLabelColorSelector)];

    targetEls.forEach(el => (el.style.backgroundColor = newColor));
    
    // input으로 들어올 수도 있음
    if (newColor !== $(formColorValueSelector).value) {
      $(formColorValueSelector).value = newColor;
    }
  },
  /**
   * render
   */
  render() {
    // 한 번 쓰는 함수는 지역 함수로 정의
    const renderWrapper = () => renderPageInApp(getLabelTpl());
    const renderInitialLabelColor = () => this.renderLabelColor(newLabelColorStore$.curr);

    pipe(
      renderWrapper,
      renderInitialLabelColor,
      this.addNewLabelFormListener.bind(this),
      getLabelStore$, // get data
      // test용 임시, new form 보이기
      () => this.toggleLabelForm(),
    )();
  }
}
