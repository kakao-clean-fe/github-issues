import {getLabelItemTpl, getLabelTpl} from '../template/tpl';
import {labelPreviewSelector, newLabelColorSelector, newLabelBtnSelector, labelListContainerSelector, labelCountSelector, labelFormSelector, formHiddenClass, labelCreateCancelButtonSelector, formColorValueSelector} from '../template/selector';
import {$ ,clearElement, setRenderTarget } from '../util/dom';
import { getLabelStore$, newLabelColorStore$ } from '../store/label';
import { addFormEventListener, formData$ } from './labelForm';
import {compose, pipe} from '../util/operator';

/**
 * week2. 객체지향으로 짜보기
 */
const renderWrapper = compose(setRenderTarget($('#app')), getLabelTpl);
const renderInitialLabelColor = () => renderLabelColor(newLabelColorStore$.curr);

const addNewLabelFormListener = () => {
  // color 새로고침
  $(newLabelColorSelector).addEventListener('click', () => newLabelColorStore$.next);

  toggleLabelFormListener([newLabelBtnSelector,labelCreateCancelButtonSelector]);
  addFormEventListener();
}

const toggleLabelFormListener = (targetElements = []) => {
  targetElements.forEach(el => $(el).addEventListener('click', () => {
    formData$.isCreating = !formData$.isCreating;
  }));
}

// proxy에서 side effect
const renderLabelColor = (newColor) => {
  const targetEls = [$(labelPreviewSelector), $(newLabelColorSelector)];

  targetEls.forEach(el => (el.style.backgroundColor = newColor));
  
  // input으로 들어올 수도 있음
  if (newColor !== $(formColorValueSelector).value) {
    $(formColorValueSelector).value = newColor;
  }
}

// store에 watcher로
const renderLabelCount = (labels) => {
  $(labelCountSelector).textContent = labels.length;
}

// store에 watcher로
const renderLabelItem = (labels) => {
  clearElement(labelListContainerSelector);

  const wrapper = setRenderTarget($(labelListContainerSelector));
  labels.forEach(label => wrapper(getLabelItemTpl(label)));
}

const initLabelPage = pipe(
  renderWrapper,
  renderInitialLabelColor,
  // test용 임시
  () => {formData$.isCreating = !formData$.isCreating;},
  addNewLabelFormListener,
  getLabelStore$ // get data
);

export {
  initLabelPage,
  renderLabelColor,
  renderLabelCount,
  renderLabelItem
}