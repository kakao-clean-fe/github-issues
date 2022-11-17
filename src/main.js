import initIssuePage from "./pages/issue.js";
import {useAtom, useAtomValue} from "./store/atomHooks.js";
import {labelsAtom, navBtnStatusAtom} from "./store/atom.js";
import {NAV_BTN_STATUS} from "./consts/const.js";
import {LabelPage} from "./pages/label.js";
import {SELECTOR} from "./consts/selector.js";
import { worker } from './mocks/browser';

worker.start().then(r => console.log("mock server start"));

const [getNavBtnStatus, setNavBtnStatus] = useAtom(navBtnStatusAtom);
const getLabels = useAtomValue(labelsAtom);
let labelPage;

const initMain = () => {
    initNavBar();
    renderByNavBtnStatus(getNavBtnStatus());
}

const initNavBar = () => {
    [...document.querySelector('#navBar').children].forEach((btn) => {
        const isIssueElem = btn.innerText.includes('Issue');
        btn.addEventListener('click', onClickNavBtn(isIssueElem ? NAV_BTN_STATUS.ISSUE : NAV_BTN_STATUS.LABEL));
    });
}

const renderByNavBtnStatus = (navBtn) => {
    if (navBtn === NAV_BTN_STATUS.ISSUE) initIssuePage();
    else {
        if(!labelPage) labelPage = new LabelPage({}, SELECTOR.ROOT);
        labelPage.render();
    }
}

const onClickNavBtn = (NavBtn) => () => {
    setNavBtnStatus(NavBtn);
    renderByNavBtnStatus(NavBtn);
}

initMain();