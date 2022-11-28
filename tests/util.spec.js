import { describe, it, expect } from 'vitest';
import issues from './mocks/issues.json';
import { getIssuesWithStatus } from '../src/utils/status';
import { CLOSED } from '../src/constants/status';


describe('유틸 함수 테스트', () => {

  describe('util/status', () => {
    it('getIssuesWithStatus - closed 상태인 이슈 가져오기', () => {
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
