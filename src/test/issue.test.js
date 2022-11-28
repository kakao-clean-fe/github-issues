// 1. issue, label 버튼 클릭 시 페이지 이동
// 2. issue 정보 불러와서 list에 추가
// 3. open / close 버튼 동작

import { getFetchData } from '../api';
import { IssuesData } from '../stores/issue';
import {jest} from '@jest/globals'

describe('📄 [issue Page] :', () => {
  const issueData = IssuesData();

  test('API로부터 가져온 issue 데이터 store에 저장 : ', async () => {
    //given
    const getIssueMock = jest.spyOn(issueData, 'setIssues');
    const getIssues =  await getFetchData('issues');
    issueData.setIssues(getIssues);
    expect(getIssueMock).toBeCalledTimes(1);
    expect(getIssueMock).not.toBe([]);
  });
});