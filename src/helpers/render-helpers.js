import { pipe, tab } from "./fp-helpers";

export const htmlToElement = pipe(
  (html) => html.trim(),
  (html) => ({ ele: document.createElement("template"), html }),
  tab(({ ele, html }) => (ele.innerHTML = html)),
  ({ ele }) => ele.content.firstChild
);

export const $ = (value) => document.getElementById(value);
export const $$ = (rootElement) => (value) => rootElement.getElementById(value);
