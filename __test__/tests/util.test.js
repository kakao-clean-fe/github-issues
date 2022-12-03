import {pipe} from "../../src/utils/functional";
import {MOCK_ISSUES} from "../mocks/object";
import {filterIssueByStatus} from "../../src/utils/util";
import {ISSUE_STATUS} from "../../src/consts/const";

describe("util 테스트", () => {
    test("pipe를 테스트 합니다", () => {
        //given
        const data = [1,2,3,4,5];
        const f1 = (data) => data.splice(2);
        const f2 = (data) => data.map(d => d*2);
        const f3 = (data) => data.concat(99);

        //when
        const result = pipe(f1, f2, f3)(data);

        //then
        expect(result[0]).toBe(6);
        expect(result[1]).toBe(8);
        expect(result[2]).toBe(10);
        expect(result[3]).toBe(99);
    });
    test("filterIssueByStatus를 테스트 합니다", () => {
        //given
        const data = MOCK_ISSUES;

        //when
        const result = filterIssueByStatus(data, ISSUE_STATUS.OPEN)[0];

        //then
        expect(result.title).toBe("open-issue");
    });
})