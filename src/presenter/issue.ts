import Model from '../models/issue';
import {Issue} from "../types";
import IssueView from "../view/issue";

export type IssuePresenterType = Omit<IssuePresenter, 'notifyLoaded'>;
export type IssueContactType = Pick<IssuePresenter, 'notifyLoaded'>;

export default class IssuePresenter {
    private view: IssueView;
    private model;

    public constructor(view: IssueView) {
        this.view = view;
        this.model = Model(this);
        this.loadIssueList = this.loadIssueList.bind(this);
        this.getIssueList = this.getIssueList.bind(this);
    }

    public loadIssueList() {
        this.model.loadIssue();
    }

    public getIssueList() {
        const issues: Array<Issue> = this.model.getResource();
        return issues;
    }

    public notifyLoaded(issue: Array<Issue>) {
        this.view.updateIssues(issue);
    }

}
