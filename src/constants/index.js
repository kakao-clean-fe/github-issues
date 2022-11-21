const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const MENU = {
  ISSUE: 0,
  LABEL: 1,
};

const ISSUE_STATUS = {
  OPEN: "open",
  CLOSE: "close",
};

const LABEL = {
  NEW_BTN: "new-label-button",
  CREATE_BTN: "label-create-button",
  CANCEL_BTN: "label-cancel-button",
  NEW_COLOR: "new-label-color",
  COLOR_VALUE: "#label-color-value",
  COLOR_PREVIEW: "#label-preview",
  NEW_FORM: "#new-label-form",
  WRAPPER: "#labels-wrapper ul",
  NEW_INPUT: "dl.form-group.my-2 input",
  REFRESH_BTN: "refresh-labels",
  KEY: "new_label",
};

const LABEL_CLASS = {
  INPUT: ["form-group", "my-2"],
};

const ISSUE = {};

const ISSUE_CLASS = {
  OPEN_COUNT: "open-count",
  CLOSE_COUNT: "close-count",
  STATUS_TAB: ".statusTab",
};

const COMMON = {
  HIDDEN: "hidden",
  FONT_BOLD: "font-bold",
};

export {
  $,
  $$,
  MENU,
  ISSUE_STATUS,
  LABEL,
  LABEL_CLASS,
  ISSUE,
  ISSUE_CLASS,
  COMMON,
};
