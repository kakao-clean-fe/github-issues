import {getIssueItemTpl, getLabelItemTpl} from "./templates/tpl.js";
import {createTabElement, createAppendChild, htmlToElement, pipe, removeChildren} from "./utils";
import {
  CLOSE_BUTTON_SELECTOR,
  ISSUE_UL_SELECTOR,
  LABEL_UL_SELECTOR,
  OPEN_BUTTON_SELECTOR
} from "./const.js";
import store, {
  GET_ISSUES,
  GET_LABELS,
  GET_UPDATED_LABELS,
  ISSUE_TAB,
  LABEL_TAB,
  POST_LABEL, POST_LABEL_FAILED,
  POST_LABEL_SUCCESS
} from './store';
import {LabelInput} from "./utils/observer";
import {generateRandomColor} from "./utils/color.js";

export const createIssueTab = () => {
  const tabElement = createTabElement(ISSUE_TAB);
  const app = document.getElementById('app');
  app?.appendChild(tabElement);

  const opensButton = document.querySelector(OPEN_BUTTON_SELECTOR);
  const closedButton = document.querySelector(CLOSE_BUTTON_SELECTOR);

  // event handler
  opensButton.addEventListener('click', () => {
    const {issueStatus: {open}} = store.getState();
    removeChildren(document.querySelector(ISSUE_UL_SELECTOR));
    open.map(appendIssue);
  });
  // event handler
  closedButton.addEventListener('click', () => {
    const {issueStatus: {close}} = store.getState();
    removeChildren(document.querySelector(ISSUE_UL_SELECTOR));
    close.map(appendIssue);
  });

  const appendToUlFunction = createAppendChild(ISSUE_UL_SELECTOR);
  const appendIssue = (item) => pipe(getIssueItemTpl, htmlToElement, appendToUlFunction)(item);

  store.subscribe((prev, cur, action) => {
    if (action.type !== GET_ISSUES) return;
    const {issues, issueStatus: {open, close}} = cur;

    opensButton.textContent = `${open.length} Open`;
    closedButton.textContent = `${close.length} Closed`;

    issues.map((issue) => {
      appendIssue(issue);
    });
  });

  store.dispatch({
    type: GET_ISSUES
  });
};


export const createLabelTab = () => {
  const tabElement = createTabElement(LABEL_TAB);
  const app = document.getElementById('app');
  app?.appendChild(tabElement);

  const newLabelButton = document.getElementById('new-label');
  const updateLabelButton = document.getElementById('update-label-button')

  newLabelButton?.addEventListener('click', loadFormElement);
  updateLabelButton?.addEventListener('click', () => {
    store.dispatch({type: GET_UPDATED_LABELS});
  });

  const appendToUlFunction = createAppendChild(LABEL_UL_SELECTOR);
  const appendLabel = (item) => pipe(getLabelItemTpl, htmlToElement, appendToUlFunction)(item);

  store.subscribe((prev, cur, action) => {
    if (
      action.type !== GET_LABELS
      && action.type !== GET_UPDATED_LABELS
      && action.type !== POST_LABEL
    ) return;

    // update labels
    const ulElement = document.querySelector(LABEL_UL_SELECTOR);
    removeChildren(ulElement);

    const {labels} = cur;
    labels.map((label) => {
      appendLabel(label);
    });
  });

  store.dispatch({
    type: GET_LABELS
  });
};

const loadFormElement = async () => {
  // check if form is already mounted
  const existingForm = document.getElementById('new-label-form');
  if (existingForm) return;

  // use dynamic import
  const {getNewLabelFormTpl} = await import("./templates/getNewLabelsTpl");
  const form = htmlToElement(getNewLabelFormTpl());
  const formWrapper = document.getElementById('form-wrapper');
  formWrapper.appendChild(form);

  const labelInput = new LabelInput({name: '', description: '', color: ''});
  const labelPreview = document.getElementById('label-preview');
  const nameInput = document.getElementById('label-name-input');
  const descriptionInput = document.getElementById('label-description-input');
  const colorInput = document.getElementById('label-color-value');

  const newColorButton = document.getElementById('new-label-color');
  const cancelButton = document.getElementById('label-cancel-button');
  const submitButton = document.getElementById('label-create-button');
  const enableSubmit = () => {
    submitButton.classList.remove('opacity-50');
    submitButton.removeAttribute('disabled');
  };
  const disableSubmit = () => {
    submitButton.classList.add('opacity-50');
    submitButton.setAttribute('disabled', '');
  };

  labelInput.subscribe(() => {
    colorInput.value = labelInput.color;
    labelPreview.style.backgroundColor = `#${labelInput.color}`;
    newColorButton.style.backgroundColor = `#${labelInput.color}`;

    if (nameInput.value !== '' && descriptionInput.value !== '' && colorInput.value !== '') {
      enableSubmit();
    } else {
      disableSubmit();
    }
  });

  store.subscribe((prevState, state, action) => {
    switch (action.type) {
      case POST_LABEL_SUCCESS:
        removeFormElement();
        break;
      case POST_LABEL_FAILED:
        alert('post failed: internal server error!');
        break;
    }
  });

  nameInput.addEventListener('input', (e) => {
    labelInput.name = e.target.value;
  });
  descriptionInput.addEventListener('input', (e) => {
    labelInput.description = e.target.value;
  });
  colorInput.addEventListener('input', (e) => {
    labelInput.color = e.target.value;
  });
  newColorButton.addEventListener('click', () => {
    labelInput.color = generateRandomColor();
  });
  cancelButton.addEventListener('click', removeFormElement);
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    store.dispatch({
      type: POST_LABEL,
      data: {name: labelInput.name, description: labelInput.description, color: labelInput.color}
    });
  });
};

const removeFormElement = () => {
  const formWrapper = document.getElementById('form-wrapper');
  removeChildren(formWrapper);
};
