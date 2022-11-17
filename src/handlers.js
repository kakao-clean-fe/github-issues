import {getIssueItemTpl, getLabelItemTpl} from "./tpl.js";
import {createTabElement, createAppendChild, htmlToElement, pipe, removeChildren} from "./utils.js";
import {
  CLOSE_BUTTON_SELECTOR,
  ISSUE_UL_SELECTOR,
  LABEL_UL_SELECTOR,
  OPEN_BUTTON_SELECTOR
} from "./const.js";
import store, {GET_ISSUES, GET_LABELS, ISSUE_TAB, LABEL_TAB} from './store';
import {LabelInput} from "./classes.js";

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
  const labelCancelButton = document.getElementById('label-cancel-button');
  const form = document.getElementById('new-label-form');
  const toggleHandler = toggleVisibility(form);

  newLabelButton?.addEventListener('click', toggleHandler);
  labelCancelButton?.addEventListener('click', toggleHandler);

  const appendToUlFunction = createAppendChild(LABEL_UL_SELECTOR);
  const appendLabel = (item) => pipe(getLabelItemTpl, htmlToElement, appendToUlFunction)(item);

  store.subscribe((prev, cur, action) => {
    if (action.type !== GET_LABELS) return;

    const {labels} = cur;
    labels.map((label) => {
      appendLabel(label);
    });
  });

  store.dispatch({
    type: GET_LABELS
  });
};

const toggleVisibility = (element) => {
  const labelInput = new LabelInput({name: '', description: '', color: ''});
  const nameInput = document.getElementById('label-name-input');
  const descriptionInput = document.getElementById('label-description-input');
  const colorInput = document.getElementById('label-color-value');
  const submitButton = document.getElementById('label-create-button');
  const enableSubmit = () => {
    submitButton.classList.remove('opacity-50');
    submitButton.removeAttribute('disabled');
  };
  const disableSubmit = () => {
    submitButton.classList.add('opacity-50');
    submitButton.setAttribute('disabled', '');
  };
  const initialize = () => {
    element.classList.add('hidden');
    disableSubmit();
    labelInput.initialize();
    nameInput.value = '';
    descriptionInput.value = '';
    colorInput.value = '';
  }

  labelInput.subscribe(() => {
    if (nameInput.value !== '' && descriptionInput.value !== '' && colorInput.value !== '') {
      enableSubmit();
    } else {
      disableSubmit();
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
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    initialize();
  });


  let isVisible = false;

  return () => {
    if (isVisible) {
      initialize();
    } else {
      element.classList.remove('hidden');
    }
    isVisible = !isVisible;
  };
}
