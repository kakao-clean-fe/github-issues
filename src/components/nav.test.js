import {assert, describe, expect, it} from 'vitest';
import {AppState} from "../libs/state.js";
import Nav from "./nav.js";


describe('Nav class를 테스트한다', () => {
  const document = window.document
  document.body.innerHTML = `
  <nav class="flex justify-end py-8 w-full m-auto text-1xl bg-neutral-800" style="padding-right: 12.5rem;">
    <button class="tab issue mr-4 base-outer p-2 px-5">Issue</button>
    <button class="tab label base-outer p-2 px-5">Label</button>
  </nav>
  `
  new Nav()
  const $ = {
    labelTabButton: document.querySelector('nav .tab.label'),
    issueTabButton: document.querySelector('nav .tab.issue')
  }

  it('Label 탭을 선택한다', () => {
    // given
    const spy = vi.spyOn(AppState, 'update')

    // when
    $.labelTabButton.dispatchEvent(new window.Event('click'))
    expect(spy).toHaveBeenCalledTimes(1)
  })

})

