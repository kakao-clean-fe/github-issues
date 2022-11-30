import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import labels from './mocks/labels.json';
import { LabelPage } from '../src/pages/label';
import { selectAllElement, selectElement } from '../src/utils/dom';
import { SELECTOR } from '../src/constants/selector';

describe('component', () => {
  describe('label page', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    const window = new Window();
    const document = window.document;
    document.body.innerHTML = `
      <div id="app" class="py-8">
      </div>
    `;

    const app = document.querySelector('#app');
    const labelPage = new LabelPage(labels, app);
    labelPage.render();

    it('컴포넌트가 labelData를 정상적으로 갖고 있다.', () => {
      expect(labelPage.labelData).toEqual(labels);
    });

    it('labelData의 라벨 갯수에 맞게 라벨들이 렌더링 된다.', () => {
      // given
      const numOfLabels = labels.length;

      // when
      const labelListElement = selectElement(SELECTOR.LABEL_LIST_TABLE, app);
      const numOfRenderedLabelItem = selectAllElement(SELECTOR.LABEL_ITEM, labelListElement).length;

      // then
      expect(numOfRenderedLabelItem).toEqual(numOfLabels);
    });

    it('label 생성 시 설정한 대로(이름, 설명, 색상) 라벨 목록에 추가된다.', () => {
      // given
      const name = 'closed';
      const description = 'done issue';
      const color = '#4649FF';

      // when

      // then
    });

  });
});