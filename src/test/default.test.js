// 1. issue, label 버튼 클릭 시 페이지 이동
// 2. issue 정보 불러와서 list에 추가
// 3. open / close 버튼 동작

// import {jest} from '@jest/globals';
import '@testing-library/jest-dom';
import { Window } from 'happy-dom';
// import { IssuesData } from '../stores/issue';
import fetchMock from "jest-fetch-mock";
import { initBodyStr } from '../constants/template-label';
import { issueMockData } from '../mocks/data';
import { querySelector, querySelectorAll } from '../utils/dom-selector';
import { filterByStatus, getStatusCount } from '../utils/status';
import { getStorageItem, setStorageItem } from '../utils/storage';


describe('🧸 [Util Test] :', () => {
  const window = new Window();
  const document = window.document;
  beforeEach(() => {
    fetchMock.resetMocks();
    document.body.innerHTML = initBodyStr;
  });

  test('querySelector() 함수를 이용해서 #app에 접근한다.', () => {
    const app = querySelector('#app', document);
    expect(app).toBeInTheDocument();
  });

  test('querySelectorAll() 함수를 이용해서 .p-2 리스트에 접근한다.', () => {
    const app = querySelectorAll('.p-2', document);
    expect(app).toHaveLength(2);
  });

  test('getStatusCount() 함수를 이용해서 Issue 데이터로부터 Open/Close 개수를 구한다.', () => {
    const count = getStatusCount(issueMockData);
    expect(count.open).not.toBe(undefined);
    expect(count.close).not.toBe(undefined);
  });

  test('filterByStatus() 함수를 이용해서 Open/Close에 해당하는 배열을 구한다.', () => {
    const count = getStatusCount(issueMockData);
    const open = filterByStatus(issueMockData, 'open');
    const close = filterByStatus(issueMockData, 'close');

    expect(count.open).toBe(open.length);
    expect(count.close).toBe(close.length);
  });

  test('setStorageItem(), getStorageItem() 함수를 이용해서 key, value를 저장한다.', () => {
    const test1 = {key : 'saveString', value : '문자열 저장 테스트'};
    const test2 = {key : 'saveArray', value : ['happy', 'birthday']};
    const test3 = {key : 'saveObject', value : {'name':'lucy'}};

    const test = [test1, test2, test3];
    test.forEach(t => {
      setStorageItem(t.key, t.value, window.localStorage);
      const value = typeof t.value === 'string' ? t.value : JSON.stringify(t.value);
      expect(getStorageItem(t.key, {}, window.localStorage)).toBe(value);
    });
  })
});