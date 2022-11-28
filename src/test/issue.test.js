// 1. issue, label 버튼 클릭 시 페이지 이동
// 2. issue 정보 불러와서 list에 추가
// 3. open / close 버튼 동작

// import {jest} from '@jest/globals';
import { Window } from 'happy-dom';
import { IssuesData } from '../stores/issue';
import fetchMock from "jest-fetch-mock";
import { getStatusCount } from '../utils/status';
import { setDefaultTemplate } from '../utils/template';
import { initBodyStr } from '../constants/template-label';
import { querySelectorAll } from '../utils/dom-selector';
import { issueMockData } from '../mocks/data';

describe('📄 [issue Page] :', () => {
  const issueData = IssuesData();

  const window = new Window();
  const document = window.document;

  beforeEach(() => {
    fetchMock.resetMocks();
    document.body.innerHTML = initBodyStr;
  });

  test('API로부터 가져온 issue 데이터를 store에 저장한다. ', () => {
    issueData.setIssues(issueMockData);
    expect(issueData.getIssues()[0]._id).toEqual(123);
  });

  test('store에 저장된 issue 데이터가 있는 경우 #header의 Opens/Close 상태를 업데이트 한다.', () => {
    const issues = issueData.getIssues();
    const count = getStatusCount(issues);
    
    setDefaultTemplate(document, count);
    const statusDivList = querySelectorAll(document, '.statusTab>div');
    const textCondition = `${count.open} Opens`||`${count.close} Closed`;

    statusDivList.forEach(div => expect(div.innerHTML).not.toBe(textCondition));
  });

});