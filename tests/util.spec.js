import { describe, it, expect, vi } from 'vitest';
import issues from './mocks/issues.json';
import { getIssuesWithStatus } from '../src/utils/status';
import { CLOSED, OPEN } from '../src/constants/status';
import { selectElement, selectElementInTarget } from '../src/utils/dom';
import { LABEL_COLOR } from '../src/constants/labelColor';
import { generateColor } from '../src/utils/label';
import { localStorageUtil } from '../src/utils/localStorage';
import { boldToStatusButton } from '../src/utils/template';


describe('유틸 함수 테스트', () => {

  const window = new Window();
  const document = window.document;

  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });

  describe('util/dom', () => {
    it('selectElement', () => {
      // given
      const className = '._selected_element';

      // when

      const element = selectElement(className);

      //then
      expect(element).toEqual(document.querySelector(className));
    });
  });

  describe('util/label', () => {
    it('generateColor', () => {
      // given
      const colorArray = LABEL_COLOR;
      const targetIndex = 2;

      // when
      const {colorIndex, color} = generateColor(colorArray, targetIndex);

      // then
      expect(colorIndex).toBe(3);
      expect(color).toBe(colorArray[3]);
    });
  });

  describe('util/localStorage', () => {
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
    const mockGetItem = vi.spyOn(Storage.prototype, 'getItem');
    const mockClear = vi.spyOn(Storage.prototype, 'clear');

    it('setItem', () => {
      const labelData = {name: 'bug', description: 'need to fix', color: 'red'};

      localStorageUtil.setItem('label', labelData);

      expect(mockSetItem).toHaveBeenCalledWith('label', labelData);
    });

    it('getItem', () => {
      localStorageUtil.getItem('label');

      expect(mockGetItem).toHaveBeenCalledWith('label');
    });

    it('clear', () => {
      localStorageUtil.clear();

      expect(mockClear).toHaveBeenCalledWith();
    });
  });

  describe('util/status', () => {
    it('getIssuesWithStatus: closed 상태인 이슈 가져오기', () => {
      //given
      const totalIssues = getIssuesWithStatus(issues);

      //when
      const closedIssues = totalIssues(CLOSED);

      //then
      expect(closedIssues).toEqual([{
        "title": "new issue 124",
        "_id": 124,
        "tags": [{
            "tagName": "bug",
            "color":"brown"
        }, {
            "tagName": "document",
            "color":"green"
        }],
        "status": "close",
        "open-date": "6hours",
        "creator": "crongro",
        "projects": "",
        "milestones": "sprint2",
        "assignee": "crong",
        "subtask": ["loream", "loreamlorem"],
        "comments-count": 4
      }]);

    });
  });

});
