import {$} from '../utils';
import {Issue} from "../types";
import {getIssueItemTpl, getIssueTpl} from "../tpl";

export type IssueViewType = ReturnType<typeof IssueView>;

export const IssueView = () => {
    const $app = $('#app');
    if (!$app) throw new Error('not found #app element, plz reload page');

    let $openDiv: HTMLDivElement | null = null;
    let $closeDiv: HTMLDivElement | null = null;
    let $list: HTMLUListElement | null = null;

    const updateCounter = (issues: Array<Issue>) => {
        if (!$openDiv || !$closeDiv) return;
        const [open, close] = issues.reduce((acc, issue) => {
            if (issue.status === 'open') acc[0]++;
            else acc[1]++;
            return acc;
            }, [0, 0]);
        $openDiv.innerHTML = `${open} Opens`;
        $closeDiv.innerHTML = `${close} Closed`;
    }

    const updateList = (issues: Array<Issue>) => {
        if (!$list) return;
        $list.innerHTML = issues.reduce((acc, issue) => `${acc}${getIssueItemTpl(issue)}`, '');
    }

    const updateApp = (issues: Array<Issue>) => {
        updateList(issues);
        updateCounter(issues);
    }

    const attach = () => {
        $app.innerHTML = getIssueTpl();
        $openDiv = $('.statusTab > .open-count');
        $closeDiv = $('.statusTab > .close-count');
        $list = $('.issue-list > ul', $app);
    }

    return {attach, updateApp};
}