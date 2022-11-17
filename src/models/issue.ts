import {Issue} from "../types";
import {IssueContactType} from "../presenter/issue";
import {readIssues} from "../request";

let resource: Array<Issue> = [];

const model = (issueContact: IssueContactType) => {
    const getResource = () => resource;
    const setResource = (payload: Array<Issue>) => resource = payload;

    const loadIssue = () => {
        if (!resource.length) issueContact.notifyLoaded(resource);
        readIssues().then(issues => {
            resource = issues;
            issueContact.notifyLoaded(resource);
        });
    };

    return { getResource, setResource, loadIssue }
}

export default model;