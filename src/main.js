import initIssuePage from "./pages/issue.js";
import {useAtom, useSetAtomValue} from "./store/atomHooks.js";
import {isLabelLayoutInit, navBtnStatusAtom} from "./store/atom.js";
import {NAV_BTN_STATUS} from "./consts/const.js";
import {LabelPage} from "./pages/label.js";
import {SELECTOR} from "./consts/selector.js";
import {worker} from './mocks/browser';

worker.start().then(() => console.log("mock server start"));

const [getNavBtnStatus, setNavBtnStatus] = useAtom(navBtnStatusAtom);
const setIsLabelLayoutInit = useSetAtomValue(isLabelLayoutInit);

let labelPage;

const initMain = () => {
    initNavBar();
    renderByNavBtnStatus(getNavBtnStatus());
    import("./labelForm.js")
        .then(() => console.log("labelForm.js load complete!"));
}

const initNavBar = () => {
    [...document.querySelector('#navBar').children].forEach((btn) => {
        const isIssueElem = btn.innerText.includes('Issue');
        btn.addEventListener('click', onClickNavBtn(isIssueElem ? NAV_BTN_STATUS.ISSUE : NAV_BTN_STATUS.LABEL));
    });
}

const renderByNavBtnStatus = (navBtn) => {
    if (navBtn === NAV_BTN_STATUS.ISSUE) {
        initIssuePage();
        setIsLabelLayoutInit(false);
    } else {
        if (!labelPage) labelPage = new LabelPage({}, SELECTOR.ROOT);
        labelPage.render();
    }
}

const onClickNavBtn = (NavBtn) => () => {
    setNavBtnStatus(NavBtn);
    renderByNavBtnStatus(NavBtn);
}

initMain();