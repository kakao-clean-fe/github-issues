import {Issue} from "../types";
import {readIssues} from "../request";
import {BaseModel} from "./base";

export { type IssueModel as IssueModelType };

class IssueModel extends BaseModel<Array<Issue>> {
    public constructor() {
        super([]);
    }

    get getResource(): Array<Issue> {
        return this.resource;
    }

    set setResource(payload: Array<Issue>) {
        this.resource = payload;
        this.notify(this.resource);
    }

    public loadIssue() {
        if (!this.resource.length) this.notify(this.resource);
        readIssues().then(issues => this.setResource = issues);
    }
}

export default new IssueModel();