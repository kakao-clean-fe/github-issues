import {ISSUE_STATUS, NAV_BTN_STATUS} from "../consts/const.js";
import {atom} from "./atomHooks.js";

export const issueStatusAtom = atom(ISSUE_STATUS.OPEN);
export const issuesAtom = atom([]);
export const navBtnStatusAtom = atom(NAV_BTN_STATUS.ISSUE);
export const labelsAtom = atom([]);
// LabelForm 을 별도로 분리하기 위해 children 연관 관계를 강제를 끊고 최초 dom load를 인지할 수 있도록 store 활용
export const isLabelLayoutInit = atom(false);