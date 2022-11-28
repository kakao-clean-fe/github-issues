// 1. issue, label 버튼 클릭 시 페이지 이동
// 2. issue 정보 불러와서 list에 추가
// 3. open / close 버튼 동작

import {jest} from '@jest/globals';
import { Window } from 'happy-dom';
import { IssuesData } from '../stores/issue';
import fetchMock from "jest-fetch-mock";
import { getStatusCount } from '../utils/status';
import { setDefaultTemplate } from '../utils/template';
import { pipe } from '../utils/pipe';

const mockData = [{
  "title": "new issue",
  "_id": 123,
  "tags": [{
      "tagName": "bug",
      "color":"brown"
  }, {
      "tagName": "document",
      "color":"blue"
  }],
  "status": "open",
  "open-date": "6hours",
  "creator": "crongro",
  "projects": "",
  "milestones": "sprint2",
  "assignee": "crong",
  "subtask": ["loream", "loreamlorem"],
  "comments-count": 4
}];

describe('📄 [issue Page] :', () => {
  const issueData = IssuesData();

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('API로부터 가져온 issue 데이터를 store에 저장한다. ', () => {
    issueData.setIssues(mockData);
    expect(issueData.getIssues()[0]._id).toEqual(123);
  });

  test('store에 저장된 issue 데이터를 불러와 list에 추가한다. ', () => {

    const window = new Window();
    const document = window.document;
    const issues = issueData.getIssues();
    pipe(getStatusCount, setDefaultTemplate)(issues);
    const header = document.querySelector('#header');
    expect(header).not.toBe(undefined);
  });

});