import { describe, expect, it } from "vitest";
import { LabelPage } from "../page/label";
import { AppSelector } from "../template/selector";

describe('label component', () => {
  // given
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = `
    <div id="app"></div>
  `;

  const rootEl = document.querySelector(AppSelector);
  const labelPage = new LabelPage();

  it('render label wrapper', () => {
    // when
    labelPage.render(rootEl);

    // then
    expect(rootEl.textContent).toContain('labels');
  })
})