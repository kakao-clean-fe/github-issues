// 테스트용 별도 msw api로 작업하고 싶었으나, fetch가 jest(node)에서 동작하지 않아 별도의 mock lib 사용
import fetch from "jest-fetch-mock";
import {MOCK_ISSUES, MOCK_LABELS} from "../mocks/object";
import {fetchIssues, fetchLabels} from "../../src/utils/fetch";

describe("fetch 테스트", () => {
    test("이슈(issue) 데이터 fetch를 성공 합니다", async () => {
        //given
        fetch.mockResponseOnce(JSON.stringify(MOCK_ISSUES));

        //when
        const {data: result} = (await fetchIssues()).get();

        //then
        expect(result[0]).toHaveProperty("_id");
    });
    test("라벨(label) 데이터 fetch를 성공 합니다", async () => {
        //given
        fetch.mockResponseOnce(JSON.stringify(MOCK_LABELS));

        //when
        const {data: result} = (await fetchLabels()).get();

        //then
        expect(result[0]).toHaveProperty("name");
    });
})

describe("fetchResult 테스트", () => {
    test("fetch 성공시 doOnSuccess가 실행됩니다", async () => {
        //given
        const onSuccessFunc = jest.fn();
        fetch.mockResponseOnce(JSON.stringify(MOCK_ISSUES));

        //when
        (await fetchIssues())
            .doOnSuccess(onSuccessFunc);

        //then
        expect(onSuccessFunc).toBeCalled();
    });
    test("fetch 실패시 doOnError가 실행됩니다", async () => {
        //given
        const onErrorFunc = jest.fn();
        fetch.mockRejectOnce(new Error("잘못된 요청"));

        //when
        (await fetchIssues())
            .doOnError(onErrorFunc);

        //then
        expect(onErrorFunc).toBeCalled();
    });
})