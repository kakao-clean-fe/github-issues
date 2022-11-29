// 1. issue, label 버튼 클릭 시 페이지 이동
// 2. issue 정보 불러와서 list에 추가
// 3. open / close 버튼 동작

import '@testing-library/jest-dom';
import { Window } from 'happy-dom';
import { IssuesData } from '../stores/issue';
import fetchMock from "jest-fetch-mock";
import { getStatusCount } from '../utils/status';
import { setDefaultTemplate, setListTemplate } from '../utils/template';
import { initBodyStr } from '../constants/template-label';
import { querySelector, querySelectorAll } from '../utils/dom-selector';
import { issueMockData } from '../mocks/data';

describe('📄 [Issue Store] :', () => {
  const issueData = IssuesData();

  const window = new Window();
  const document = window.document;

  beforeEach(() => {
    fetchMock.resetMocks();
    document.body.innerHTML = initBodyStr;
  });

  test('API로부터 가져온 issue 데이터를 store에 저장한다.', () => {
    issueData.setIssues(issueMockData);
    expect(issueData.getIssues()[0]._id).toEqual(123);
  });

});
describe('📄 [Issue Page] :', () => {
  const issueData = IssuesData();

  const window = new Window();
  const document = window.document;

  const getIssues = () => issueData.getIssues();

  beforeEach(() => {
    document.body.innerHTML = initBodyStr;
    issueData.setIssues(issueMockData);
    setDefaultTemplate(getStatusCount(issueData.getIssues()), document);
  });
  const isCreatedElement = (selector) => expect(querySelector(selector, document)).toBeInTheDocument();;

  test('store에 저장된 issue 데이터가 있는 경우 #header의 Opens/Close 넘버를 업데이트 한다.', () => {
    const count = getStatusCount(getIssues());
    const statusDivList = querySelectorAll('.statusTab>div', document);
    const textCondition = `${count.open} Opens`||`${count.close} Closed`;

    statusDivList.forEach(div => expect(div.innerHTML).not.toBe(textCondition));
  });

  test('setDefaultTemplate() 함수를 이용해 #app 내부의 기본 element를 추가한다.', () => {
    expect(querySelector('#app', document)).not.toBe(undefined);
    isCreatedElement('#app');
  });

  test('setListTemplate() 함수를 이용해 issue-list를 생성한다.', () => {
    setListTemplate(getIssues(), document);
    isCreatedElement('.issue-list>ul');
  })
});

