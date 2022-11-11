import {ISSUE_STATUS} from "../const.js";
import {atom} from "./atomHooks.js";

export const issueStatusAtom = atom(ISSUE_STATUS.OPEN);
export const issuesAtom = atom([]);