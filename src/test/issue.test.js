import { describe, expect, it } from "vitest";
import { IssuePage } from "../page/issue";
import { AppSelector } from "../template/selector";

describe('issue component', () => {
  // given
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = `
    <div id="app"></div>
  `;

  const rootEl = document.querySelector(AppSelector);
  const issuePage = new IssuePage();

  it('render issue wrapper', () => {
    // when
    issuePage.render(rootEl);

    // then
    expect(rootEl.textContent).toContain('issue');
  })
})