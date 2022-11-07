import {readIssues} from "./utils";
import {IssueContactType} from "./presenter/issue";
import {LabelContactType} from "./presenter/labels";

type ResourceKey = 'issues' | 'labels';

const resource: Record<ResourceKey, any> = { issues: undefined, labels: undefined };

const model = (issueContact: IssueContactType, labelContact: LabelContactType) => {
    const getResource = (key: ResourceKey) => resource[key];
    const setResource = (key: ResourceKey, payload: any) => resource[key] = payload;

    const loadIssue = () => {
        if (resource.issues) issueContact.notifyLoaded(resource.issues);
        readIssues().then(issues => {
            resource.issues = issues;
            issueContact.notifyLoaded(resource.issues);
        });
    };
    const loadLabels = () => {
        if (resource.labels) labelContact.notifyLoaded(resource.labels);
        readIssues().then(issues => {
            resource.labels = issues;
            labelContact.notifyLoaded(resource.labels);
        });
    }

    return { getResource, setResource, loadIssue, loadLabels }
}

export default model;