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
import { getLabelItemTpl } from '../tpl';
import { selector as sel, storeKey } from '../constant';
import { addLabel } from '../service';

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
  function toggleLabelForm(event) {
    if (event.detail) {
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
    go($(sel.labelDescInput), setAttribute({ value: label.description}));
    go($(sel.labelColorInput), setAttribute({value: label.color }));
  }

  function handleInputEvents({ target }) {
    const [, setLabelForm] = store.useState(storeKey.labelForm);
    const selector = `#${target.id}`;
    switch (selector) {
      case sel.labelNameInput:
        setLabelForm((prev) => ({ ...prev, name: target.value }));
        break;
      case sel.labelColorInput:
        setLabelForm((prev) => ({ ...prev, color: target.value }));
        break;
      case sel.labelDescInput:
        setLabelForm((prev) => ({ ...prev, description: target.value }));
        break;
      default:
        break;
    }
  }

  function handleClickEvents(event) {
    event.preventDefault();
    const [, setLabels] = store.useState(storeKey.labels);
    const [, setToast] = store.useState(storeKey.toast);
    const [labelForm, setLabelForm] = store.useState(storeKey.labelForm);
    const [, setIsFormOpen] = store.useState(storeKey.isNewLabelFormOpen);

    const isDescendantOf = pipe(isDescendant(event.target));
    if (isDescendantOf($(sel.newLabelButton))) {
      setIsFormOpen((prev) => !prev);
    } else if (isDescendantOf($(sel.labelCancelButton))) {
      setIsFormOpen(false);
    } else if (isDescendantOf($(sel.labelCreateButton))) {
      addLabel(labelForm)
        .then(setLabels)
        .catch(error => setToast({ isOpen: true, message: error.message, duration: 2000 }));
    } else if (isDescendantOf($(sel.randomColorButton))) {
      setLabelForm((prev) => ({ ...prev, color: getRandomColor() }));
    }
  }

  const bindEvents = pipe(
    setEvent('input', handleInputEvents),
    setEvent('click', handleClickEvents)
  );

  function render() {
    const [labelForm] = store.useState(storeKey.labelForm);
    updateLabelForm(labelForm);
    bindEvents($(sel.labelWrapper));
    setInitialFormValue(labelForm);

    store.useEffect(storeKey.isNewLabelFormOpen, toggleLabelForm);
    store.useEffect(storeKey.labels, ({ detail }) => {
      updateLabels(detail);
      updateLabelCount(detail.length);
    });
    store.useEffect(storeKey.labelForm, ({ detail }) => {
      updateLabelForm(detail);
    });
  }

  return { render }
}