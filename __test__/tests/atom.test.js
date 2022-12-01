import {atom, useAtom, useSetAtomListener, useSetAtomValue} from "../../src/store/atomHooks.js";

describe("atom 테스트", () => {
    test("atom의 값을 변경할 수 있습니다.", () => {
        //given
        const testAtom = atom(false);
        const [getTest, setTest] = useAtom(testAtom);

        //when
        setTest(true);

        //then
        expect(getTest()).toBeTruthy();
    });
    test("atom의 state가 변경되면 등록된 listener가 수행됩니다", () => {
        //given
        const testAtom = atom(null);
        const effectFunction = jest.fn();
        const setTest = useSetAtomValue(testAtom);
        const setTestListener = useSetAtomListener(testAtom);
        setTestListener(effectFunction);

        //when
        setTest('inject');

        //then
        expect(effectFunction).toBeCalled();
    });
});