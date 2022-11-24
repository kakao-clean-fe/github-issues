import {Issue} from "../types";
import IssueView from "../view/issue";
import issueModel, {IssueModelType} from "../models/issue";
import {Observer} from "../observer";

export type IssuePresenterType = Omit<IssuePresenter, 'notifyLoaded'>;

export default class IssuePresenter implements Observer {
    private view: IssueView;
    private model: IssueModelType;

    public constructor(view: IssueView) {
        this.view = view;
        this.model = issueModel;
        this.model.register(this);
        this.loadIssueList = this.loadIssueList.bind(this);
        this.getIssueList = this.getIssueList.bind(this);
    }

    public loadIssueList() {
        this.model.loadIssue();
    }

    public getIssueList() {
        const issues: Array<Issue> = this.model.getResource;
        return issues;
    }

    public notify(issue: Array<Issue>) {
        this.view.updateIssues(issue);
    }

}
