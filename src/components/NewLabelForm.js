import { pipe, go } from '../fp';
import {
  addClass,
  isDescendant,
  removeClass,
  setAttribute,
  setEvent,
  setInnerHTML,
  setInnerText,
  setStyle,
} from '../curry/dom';
import { $, getRandomColor } from '../util';
import { getLabelItemTpl } from '../components/Templates';
import { selector as sel } from '../constant';
import { addLabel } from '../service';
import { actions } from '../flux/action';

export function createNewLabelForm({ store }) {
  const show = pipe(removeClass('hidden'));
  const hide = pipe(addClass('hidden'));
  const enableButton = pipe(removeClass('opacity-50'), setAttribute({ disabled: false }));
  const disableButton = pipe(addClass('opacity-50'), setAttribute({ disabled: true }));
  const updateLabels = labels => go($(sel.labelList), setInnerHTML(labels.map(getLabelItemTpl).join('')));
  const updateLabelCount = count => go($(sel.labelCount), setInnerText(`${count} Labels`));
  const updateLabelColor = color => {
    go($(sel.labelColor), setStyle({ backgroundColor: color }));
    go($(sel.labelColorInput), setAttribute({ value: color }))
  }
  const updatePreviewLabel = label => go(
    $(sel.labelPreview),
    setInnerText(label.name || 'Label preview'),
    setStyle({ backgroundColor: label.color })
  );
  function toggleLabelForm(state) {
    if (state.isLabelFormOpen) {
      show($(sel.newLabelForm));
    } else {
      hide($(sel.newLabelForm));
    }
  };
  function updateLabelForm(label) {
    updatePreviewLabel(label)
    updateLabelColor(label.color);
    if (label.name && label.description && label.color) {
      enableButton($(sel.labelCreateButton));
    } else {
      disableButton($(sel.labelCreateButton));
    }
  }
  function setInitialFormValue(label) {
    go($(sel.labelNameInput), setAttribute({ value: label.name }));
    go($(sel.labelDescInput), setAttribute({ value: label.description }));
    go($(sel.labelColorInput), setAttribute({ value: label.color }));
  }

  function handleInputEvents({ target }) {
    const selector = `#${target.id}`;
    switch (selector) {
      case sel.labelNameInput:
        store.dispatch(actions.setLabelForm({ name: target.value }));
        break;
      case sel.labelColorInput:
        store.dispatch(actions.setLabelForm({ color: target.value }));
        break;
      case sel.labelDescInput:
        store.dispatch(actions.setLabelForm({ description: target.value }));
        break;
      default:
        break;
    }
  }

  function handleClickEvents(event) {
    event.preventDefault();
    const labelForm = store.getState(state => state.labelForm);
    const isLabelFormOpen = store.getState(state => state.isLabelFormOpen);

    function setLabels(labels) {
      store.dispatch(actions.setLabels(labels));
    }
    function showToastErrorMessage(error) {
      store.dispatch(actions.showToastMessage({ message: error.message, duration: 3000 }));
    }
    console.log(event.target);
    const isDescendantOf = pipe(isDescendant(event.target));
    if (isDescendantOf($(sel.newLabelButton))) {
      console.log('여기!')
      store.dispatch(actions.setIsLabelFormOpen(!isLabelFormOpen));
    } else if (isDescendantOf($(sel.labelCancelButton))) {
      store.dispatch(actions.setIsLabelFormOpen(false));
    } else if (isDescendantOf($(sel.labelCreateButton))) {
      addLabel(labelForm)
        .then(setLabels)
        .catch(showToastErrorMessage);
    } else if (isDescendantOf($(sel.randomColorButton))) {
      store.dispatch(actions.setLabelForm({ color: getRandomColor() }));
    }
  }

  const bindEvents = pipe(
    setEvent('input', handleInputEvents),
    setEvent('click', handleClickEvents)
  );

  function render() {
    const labelForm = store.getState(state => state.labelForm);
    updateLabelForm(labelForm);
    bindEvents($(sel.labelWrapper));
    setInitialFormValue(labelForm);

    store.addActionListener(toggleLabelForm, actions => [actions.setIsLabelFormOpen]);
    store.addActionListener((state) => {
      updateLabels(state.labels);
      updateLabelCount(state.labels.length);
    }, actions => [actions.setLabels, actions.appendLabels]);
    store.addActionListener((state) => {
      updateLabelForm(state.labelForm);
    }, actions => [actions.setLabelForm]);
  }

  return { render }
}