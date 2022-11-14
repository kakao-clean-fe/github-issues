import {ISSUE_STATUS, NAV_BTN_STATUS} from "../const.js";
import {atom} from "./atomHooks.js";

export const issueStatusAtom = atom(ISSUE_STATUS.OPEN);
export const issuesAtom = atom([]);
export const navBtnStatusAtom = atom(NAV_BTN_STATUS.ISSUE);
export const labelsAtom = atom([]);