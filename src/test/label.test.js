import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { labels } from "../fixtures/values";
import { LabelPage } from "../page/label";
import { LabelFormComponent } from "../page/labelForm";
import { labelStore$ } from "../store/label";
import { AppSelector, formHiddenClass, labelCountSelector, labelFormSelector, labelListContainerSelector, newLabelBtnSelector } from "../template/selector";
import { apiService } from "../util/httpService";

describe('label component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
    
  afterEach(() => {
    vi.restoreAllMocks()
  });

  // given
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = `
    <div id="app"></div>
  `;

  const rootEl = document.querySelector(AppSelector);
  const labelPage = new LabelPage();

  vi.mock('../util/abortControllerManager', () => {
    const AbortControllerManager = vi.fn();
    AbortControllerManager.prototype.getControllerKey = vi.fn();
    AbortControllerManager.prototype.getSignal = vi.fn();
    
    return {AbortControllerManager}
  })

  it('render label wrapper', () => {
    // when
    labelPage.render(rootEl);

    // then
    expect(rootEl.textContent).toContain('labels');
  })

  /**
   * 위에 label wrapper가 렌더된채로 남아있음
   */
  it('렌더되는 라벨 개수랑 표시되는 라벨 카운트가 일치하는지 확인', async () => {
    // given
    const fetchLabelsSpy = vi.spyOn(apiService, 'get');
    fetchMock.mockResponseOnce(JSON.stringify(labels));

    await labelStore$.fetchLabels();
    expect(fetchLabelsSpy).toHaveBeenCalledOnce();

    const dataLength = labelStore$.value.length;
    const renderedCount = Number(rootEl.querySelector(labelCountSelector).textContent);
    const renderedItemLength = Number(rootEl.querySelectorAll(labelListContainerSelector + ' li').length);
    
    expect(dataLength).toEqual(renderedCount);
    expect(renderedCount).toEqual(renderedItemLength);
  })

  it('New label 버튼을 클릭하면 form이 보이기', async () => {
    //given
    const formEl = rootEl.querySelector(labelFormSelector);
    const getHasHiddenClass = () => formEl.classList.contains(formHiddenClass);

    const button = rootEl.querySelector(newLabelBtnSelector);
    const isHidden = getHasHiddenClass();
    // when
    button.click();
    // 동적으로 렌더되는것 기다리기 
    await window.happyDOM.whenAsyncComplete();

    // then
    expect(getHasHiddenClass()).toBe(!isHidden);
  })
})