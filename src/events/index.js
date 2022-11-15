export const LABEL_CREATOR_EVENT = {
  _color: [
    [
      "label-preview",
      (el, store) => {
        if (!store.value) {
          return;
        }
        el.style = `background-color:${store.value};`;
      },
    ],
    [
      "label-color-value",
      (el, store) => {
        if (!store.value) {
          return;
        }
        el.value = store.value;
      },
    ],
    [
      "new-label-color",
      (el, store) => {
        if (!store.value) {
          return;
        }
        el.style = `background-color:${store.value};`;
      },
    ],
  ],
  _name: [
    [
      "label-preview",
      (el, store) => {
        el.innerText = store.value || "Label preview";
      },
    ],
    [
      "label-name-input",
      (el, store) => {
        el.value = store.value;
      },
    ],
    [
      "label-create-button",
      (el, store) => {
        el.classList.toggle("opacity-50", !store.value);
        if (store.value) {
          el.removeAttribute("disabled");
          return;
        }
        el.setAttribute("disabled", "true");
      },
    ],
  ],
  _description: [
    [
      "label-description-input",
      (el, store) => {
        el.value = store.value;
      },
    ],
  ],
  _error: [
    [
      "label-create-button",
      (el, store) => {
        el.classList.toggle("opacity-50", store.value);
        if (!store.value) {
          el.removeAttribute("disabled");
          return;
        }
        el.setAttribute("disabled", "true");
      },
    ],
    [
      "label--name-error",
      (el, store) => {
        el.innerText = store.value;
        if (store.value) {
          el.removeAttribute("hidden");
          return;
        }
        el.setAttribute("hidden", "true");
      },
    ],
  ],
};
