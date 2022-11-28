import { describe, it, expect } from 'vitest';
import issues from './mocks/issues.json';
import { getIssuesWithStatus } from '../src/utils/status';
import { CLOSED } from '../src/constants/status';
import { selectElement, selectElementInTarget } from '../src/utils/dom';
import { LABEL_COLOR } from '../src/constants/labelColor';
import { generateColor } from '../src/utils/label';


describe('유틸 함수 테스트', () => {

  const window = new Window();
  const document = window.document;

  beforeEach(() => {
    document.body.innerHTML = `<div class="root"></div>`;
  });

  describe('util/dom', () => {
    it('selectElement', () => {
      // given
      document.body.innerHTML = `
        <div class="_selected_element"></div>
      `;
      const className = '._selected_element';

      // when

      const element = selectElement(className, document);

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

  describe('util/template', () => {
    it('boldToStatusButton', () => {

    })
  });

});
