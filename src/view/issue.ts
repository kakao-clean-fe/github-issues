import {$, pipe} from '../utils';
import {Issue} from "../types";
import IssuePresenter, {IssuePresenterType} from "../presenter/issue";
import {getIssueItemTpl, getIssueTpl} from "../tpl";

const DEFAULT_COUNT = [0, 0];

const countReducer = (acc: Array<number>, issue: Issue) => {
    if (issue.status === 'open') acc[0]++;
    else acc[1]++;
    return acc;
}

class IssueView {
    private presenter: IssuePresenterType;
    private readonly $app: HTMLDivElement | null;
    private $openDiv: HTMLDivElement | null = null;
    private $closeDiv: HTMLDivElement | null = null;
    private $list: HTMLUListElement | null = null;

    public constructor() {
        this.$app = $('#app');
        this.presenter = new IssuePresenter(this);
        this.filterOpenIssues = this.filterOpenIssues.bind(this);
        this.filterCloseIssues = this.filterCloseIssues.bind(this);
        this.updateList = this.updateList.bind(this);
        this.updateCounter = this.updateCounter.bind(this);
    }

    public attach() {
        if (!this.$app) return;
        this.$app.innerHTML = getIssueTpl();
        this.$openDiv = $('.statusTab > .open-count');
        this.$closeDiv = $('.statusTab > .close-count');
        this.$list = $('.issue-list > ul', this.$app);
        this.attachEventListener();
        this.presenter.loadIssueList();
    }

    public updateIssues(issues?: Array<Issue>) {
        this.updateList(issues);
        this.updateCounter(issues);
    }

    private attachEventListener() {
        if (!this.$openDiv || !this.$closeDiv) return;
        this.$openDiv.addEventListener('click', () => pipe(this.presenter.getIssueList.bind(this), this.filterOpenIssues, this.updateList)(undefined));
        this.$closeDiv.addEventListener('click', () => pipe(this.presenter.getIssueList.bind(this), this.filterCloseIssues, this.updateList)(undefined));
    }

    private updateCounter(issues?: Array<Issue>) {
        if (!this.$openDiv || !this.$closeDiv) return;
        const [open, close] = issues?.reduce(countReducer, [...DEFAULT_COUNT]) ?? [...DEFAULT_COUNT];
        this.$openDiv.innerHTML = `${open} Opens`;
        this.$closeDiv.innerHTML = `${close} Closed`;
    }

    private updateList(issues?: Array<Issue>) {
        if (!this.$list) return;
        this.$list.innerHTML = issues?.reduce((acc, issue) => `${acc}${getIssueItemTpl(issue)}`, '') ?? '';
    }

    private filterOpenIssues(issues: Array<Issue>) {
        return issues.filter(issue => issue.status === 'open');
    }

    private filterCloseIssues(issues: Array<Issue>) {
        return issues.filter(issue => issue.status === 'close');
    }
}

export default IssueView